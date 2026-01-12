use crate::request::{ProxyError, ProxyResponse, RequestData, send_request_from_json};
use rocket::fs::{FileServer, relative};
use rocket::serde::json::Json;
use rocket::{post, routes};

mod request;

// If we wanted or needed to serve files manually, we'd use `NamedFile`. Always
// prefer to use `FileServer`!
mod manual {
    use rocket::fs::NamedFile;
    use std::path::{Path, PathBuf};

    #[rocket::get("/second/<path..>")]
    pub async fn second(path: PathBuf) -> Option<NamedFile> {
        let mut path = Path::new(super::relative!("static")).join(path);
        if path.is_dir() {
            path.push("index.html");
        }

        NamedFile::open(path).await.ok()
    }
}

#[post("/api/fetch", data = "<json_data>")]
async fn forward_request(json_data: Json<RequestData>) -> Result<Json<ProxyResponse>, ProxyError> {
    let response_string = send_request_from_json(json_data).await?;
    Ok(Json(ProxyResponse { response_string }))
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", rocket::routes![manual::second])
        .mount("/", FileServer::from(relative!("static")))
        .mount("/", routes![forward_request])
}
