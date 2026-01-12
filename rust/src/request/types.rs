use rocket::serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct ProxyResponse {
    pub response_string: String,
}

// HttpMethod 枚举
#[derive(Debug, Serialize, Deserialize, Clone, Copy)]
#[serde(crate = "rocket::serde", rename_all = "UPPERCASE")]
pub enum HttpMethod {
    Connect,
    Options,
    Trace,
    Head,
    Get,
    Post,
    Put,
    Patch,
    Delete,
}

// HeaderParamsItem 结构体
#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
pub struct HeaderParamsItem {
    pub id: String,
    pub key: String,
    pub value: String,
    pub enable: bool,
}

// RequestData 结构体
#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
pub struct RequestData {
    pub id: String,
    pub method: HttpMethod,
    pub url: String,
    pub headers: Vec<HeaderParamsItem>,
    pub params: Vec<HeaderParamsItem>,
    pub body: String,
}
