mod error;
mod methods;
mod types;

use self::{
    error::ProxyError,
    methods::send_request_from_json,
    types::{ProxyResponse, RequestData},
};
use rocket::serde::json::Json;

// 处理 /api/fetch 接口的 POST 请求
#[rocket::post("/api/fetch", data = "<json_data>")]
pub async fn forward_request(
    json_data: Json<RequestData>,
) -> Result<Json<ProxyResponse>, ProxyError> {
    let response = send_request_from_json(json_data).await?;
    Ok(Json(ProxyResponse {
        response_string: response,
    }))
}
