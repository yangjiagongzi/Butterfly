use rocket::{
    Config,
    fairing::AdHoc,
    fs::{FileServer, relative},
    routes, tokio,
};

mod config;
mod proxy;
mod request;

use config::{PROXY_ADDR, SERVER_PORT};
use proxy::run_proxy;
use request::forward_request;

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .configure(Config {
            address: "0.0.0.0".parse().unwrap(),
            port: SERVER_PORT,
            ..Config::debug_default()
        })
        .mount("/", FileServer::from(relative!("static")))
        .mount("/", routes![forward_request])
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
