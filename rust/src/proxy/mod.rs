use anyhow::{Context, Result};
use bytes::BytesMut;
use std::net::SocketAddr;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::{TcpListener, TcpStream};

mod parser;
use parser::parse_target_addr;

/// 启动 TCP 代理服务
pub async fn run_proxy(addr: &str) -> Result<()> {
    let listener = TcpListener::bind(addr)
        .await
        .context(format!("代理服务绑定地址失败: {}", addr))?;

    loop {
        let (client_stream, client_addr) = listener.accept().await.context("接收客户端连接失败")?;
        println!("[新连接] 客户端: {}", client_addr);

        // 异步处理每个客户端，避免阻塞
        tokio::spawn(handle_client(client_stream, client_addr));
    }
}

/// 处理单个客户端连接的流量转发
async fn handle_client(mut client_stream: TcpStream, client_addr: SocketAddr) -> Result<()> {
    let mut buf = BytesMut::with_capacity(1024);
    let n = client_stream
        .read_buf(&mut buf)
        .await
        .context("读取客户端数据失败")?;

    if n == 0 {
        return Ok(());
    }

    // 打印客户端上行流量
    println!("\n[客户端 -> 代理] {} ({} bytes)", client_addr, n);
    println!("{}", String::from_utf8_lossy(&buf[..n]));

    // 解析目标服务器地址
    let target_addr = parse_target_addr(&buf[..n])?;
    println!("[目标服务器] {}", target_addr);

    // 连接目标服务器并转发数据
    let mut server_stream = TcpStream::connect(target_addr)
        .await
        .context("连接目标服务器失败")?;
    server_stream
        .write_all(&buf[..n])
        .await
        .context("转发客户端数据到目标服务器失败")?;

    // 拆分读写流
    let (client_reader, client_writer) = client_stream.split();
    let (server_reader, server_writer) = server_stream.split();

    // 双向流量转发
    let server_to_client = forward_server_to_client(server_reader, client_writer, client_addr);
    let client_to_server = forward_client_to_server(client_reader, server_writer, client_addr);

    // 任意方向流结束则关闭连接
    tokio::select! {
        res = server_to_client => res,
        res = client_to_server => res,
    }?;

    println!("[连接关闭] 客户端: {}", client_addr);
    Ok(())
}

/// 转发 服务器 -> 客户端 流量
async fn forward_server_to_client(
    mut server_reader: impl AsyncReadExt + Unpin,
    mut client_writer: impl AsyncWriteExt + Unpin,
    client_addr: SocketAddr,
) -> Result<(), anyhow::Error> {
    let mut buf = BytesMut::with_capacity(1024);
    loop {
        let n = server_reader
            .read_buf(&mut buf)
            .await
            .context("读取服务器数据失败")?;

        if n == 0 {
            break Ok(());
        }

        // 打印服务器下行流量
        println!("\n[服务器 -> 代理] {} ({} bytes)", client_addr, n);
        println!("{}", String::from_utf8_lossy(&buf[..n]));

        client_writer
            .write_all(&buf[..n])
            .await
            .context("转发服务器数据到客户端失败")?;
        buf.clear();
    }
}

/// 转发 客户端 -> 服务器 流量
async fn forward_client_to_server(
    mut client_reader: impl AsyncReadExt + Unpin,
    mut server_writer: impl AsyncWriteExt + Unpin,
    client_addr: SocketAddr,
) -> Result<(), anyhow::Error> {
    let mut buf = BytesMut::with_capacity(1024);
    loop {
        let n = client_reader
            .read_buf(&mut buf)
            .await
            .context("读取客户端数据失败")?;

        if n == 0 {
            break Ok(());
        }

        // 打印客户端上行流量
        println!("\n[客户端 -> 代理] {} ({} bytes)", client_addr, n);
        println!("{}", String::from_utf8_lossy(&buf[..n]));

        server_writer
            .write_all(&buf[..n])
            .await
            .context("转发客户端数据到服务器失败")?;
        buf.clear();
    }
}
