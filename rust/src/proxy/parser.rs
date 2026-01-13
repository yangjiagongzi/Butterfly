use anyhow::{Context, Result, anyhow};
use std::net::{SocketAddr, ToSocketAddrs};

pub fn parse_target_addr(request: &[u8]) -> Result<SocketAddr> {
    let request_str = String::from_utf8_lossy(request);
    let lines: Vec<&str> = request_str.split("\r\n").collect();

    let request_line = lines.first().context("无效 HTTP 请求: 缺少请求行")?;

    let parts: Vec<&str> = request_line.split_whitespace().collect();
    if parts.len() < 2 {
        return Err(anyhow!("无效 HTTP 请求行: {}", request_line));
    }

    let target = parts[1];
    let target_addr = if target.starts_with("http://") {
        let host_port = target.trim_start_matches("http://");
        let (host_port_part, _) = host_port.split_once('/').unwrap_or((host_port, ""));
        format!("{}:80", host_port_part)
    } else {
        target.to_string()
    };

    target_addr
        .to_socket_addrs()
        .context("解析目标地址失败")?
        .next()
        .context("无法解析目标地址")
}
