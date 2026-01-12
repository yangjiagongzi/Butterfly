use super::error::ProxyError;
use super::types::{HttpMethod, RequestData};
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use rocket::serde::json::Json;
use std::convert::TryFrom;

pub async fn send_request_from_json(json_data: Json<RequestData>) -> Result<String, ProxyError> {
    let req_data = json_data.0;
    _send_request_inner(req_data).await
}

async fn _send_request_inner(req_data: RequestData) -> Result<String, ProxyError> {
    // 1. 校验 URL
    if req_data.url.is_empty() {
        return Err(ProxyError::InvalidConfig("URL 不能为空".to_string()));
    }

    // 2. 禁止不支持的方法
    match req_data.method {
        HttpMethod::Options | HttpMethod::Connect | HttpMethod::Trace => {
            return Err(ProxyError::InvalidConfig(
                "不支持 OPTIONS/CONNECT/TRACE 方法".to_string(),
            ));
        }
        _ => {}
    }

    // 3. 拼接 URL 参数
    let mut url_with_params = req_data.url;
    if !req_data.params.is_empty() {
        url_with_params.push_str("?");
        let param_pairs: Vec<String> = req_data
            .params
            .into_iter()
            .map(|p| format!("{}={}", p.key, p.value))
            .collect();
        url_with_params.push_str(&param_pairs.join("&"));
    }

    // 4. 构建请求头
    let mut headers = HeaderMap::new();
    for h in req_data.headers {
        if h.enable && !h.key.is_empty() {
            let header_name = HeaderName::try_from(h.key)
                .map_err(|e| ProxyError::HeaderError(format!("请求头 key 非法: {}", e)))?;

            let header_value = HeaderValue::from_str(&h.value)
                .map_err(|e| ProxyError::HeaderError(format!("请求头 value 非法: {}", e)))?;

            headers.insert(header_name, header_value);
        }
    }

    // 5. 构建异步客户端和请求
    let client = reqwest::Client::new();
    let mut request_builder = match req_data.method {
        HttpMethod::Get => client.get(&url_with_params),
        HttpMethod::Post => client.post(&url_with_params),
        HttpMethod::Put => client.put(&url_with_params),
        HttpMethod::Delete => client.delete(&url_with_params),
        HttpMethod::Patch => client.patch(&url_with_params),
        HttpMethod::Head => client.head(&url_with_params),
        _ => unreachable!(),
    };

    request_builder = request_builder.headers(headers);

    // 6. 处理 body
    let body = req_data.body;
    if !body.is_empty() && !matches!(req_data.method, HttpMethod::Get | HttpMethod::Head) {
        request_builder = request_builder.body(body);
    }

    // 7. 异步发送请求
    let response = request_builder.send().await?;

    // 8. 异步读取响应
    let status = response.status();
    let status_text = status.canonical_reason().unwrap_or("Unknown");
    let status_line = format!("HTTP/1.1 {} {}", status.as_u16(), status_text);

    let mut res_headers = Vec::new();
    for (k, v) in response.headers() {
        res_headers.push(format!("{}: {}", k, v.to_str().unwrap_or("")));
    }
    let res_headers_str = res_headers.join("\n");

    // 9. 异步读取响应体
    let result = response.text().await?;

    Ok(format!(
        "{}\n{}\n\n{}",
        status_line, res_headers_str, result
    ))
}
