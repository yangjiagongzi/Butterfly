use rocket::{Config, fairing::AdHoc, routes, tokio};

mod config;
mod proxy;
mod request;

use config::{PROXY_ADDR, SERVER_PORT};
use proxy::run_proxy;
use request::forward_request;

use include_dir::{Dir, include_dir};
use rocket::{
    get,
    http::{ContentType, Status},
};
use std::path::PathBuf;

static STATIC_FILES: Dir = include_dir!("$CARGO_MANIFEST_DIR/static");

#[get("/<path..>")]
async fn serve_static(path: PathBuf) -> Result<(ContentType, &'static [u8]), Status> {
    let path_str = path.to_string_lossy();
    // 根路径直接指定 index.html
    let file = if path_str.is_empty() {
        STATIC_FILES.get_file("index.html")
    } else {
        STATIC_FILES
            .get_file(path_str.as_ref())
            .or_else(|| STATIC_FILES.get_file("index.html"))
    };
    let file = file.ok_or(Status::NotFound)?;

    let ct = if path_str.ends_with(".html") || path_str.is_empty() {
        ContentType::HTML
    } else if path_str.ends_with(".js") {
        ContentType::JavaScript
    } else if path_str.ends_with(".css") {
        ContentType::CSS
    } else if path_str.ends_with(".png") {
        ContentType::PNG
    } else if path_str.ends_with(".jpg") || path_str.ends_with(".jpeg") {
        ContentType::JPEG
    } else if path_str.ends_with(".svg") {
        ContentType::SVG
    } else if path_str.ends_with(".json") {
        ContentType::JSON
    } else if path_str.ends_with(".ico") {
        ContentType::Icon
    } else if path_str.ends_with(".txt") {
        ContentType::Plain
    } else {
        ContentType::Binary
    };

    Ok((ct, file.contents()))
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .configure(Config {
            address: "0.0.0.0".parse().unwrap(),
            port: SERVER_PORT,
            ..Config::debug_default()
        })
        .mount("/", routes![forward_request])
        .mount("/", routes![serve_static])
        .attach(AdHoc::on_liftoff("启动代理服务", |_rocket| {
            Box::pin(async move {
                tokio::spawn(async move {
                    if let Err(e) = run_proxy(PROXY_ADDR).await {
                        eprintln!("[代理服务] 运行出错: {}", e);
                    }
                });
            })
        }))
}
