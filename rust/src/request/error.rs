use rocket::{
    http::Status,
    response::{self, Responder},
    serde::json::{Json, json},
};
use std::fmt;

#[derive(Debug)]
pub enum ProxyError {
    InvalidConfig(String),
    HeaderError(String),
    RequestError(String),
}

impl fmt::Display for ProxyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ProxyError::InvalidConfig(msg) => write!(f, "配置错误: {}", msg),
            ProxyError::HeaderError(msg) => write!(f, "请求头错误: {}", msg),
            ProxyError::RequestError(msg) => write!(f, "请求错误: {}", msg),
        }
    }
}

impl std::error::Error for ProxyError {}

impl<'r> Responder<'r, 'static> for ProxyError {
    fn respond_to(self, req: &'r rocket::Request<'_>) -> response::Result<'static> {
        let error_response = Json(json!({
            "code": 500,
            "message": self.to_string()
        }));
        // 为 Json 响应附加 500 状态码
        error_response.respond_to(req).map(|mut res| {
            res.set_status(Status::InternalServerError);
            res
        })
    }
}

impl From<reqwest::Error> for ProxyError {
    fn from(e: reqwest::Error) -> Self {
        ProxyError::RequestError(e.to_string())
    }
}
