use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    if let Ok(time) = SystemTime::now().duration_since(UNIX_EPOCH) {
        let time_as_secs = time.as_millis();
        println!("cargo:rustc-env=BUILD_EPOCH={time_as_secs}");
    }
}
