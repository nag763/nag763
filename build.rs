use std::{
    process::Command,
    time::{SystemTime, UNIX_EPOCH},
};

fn main() {
    if let Ok(time) = SystemTime::now().duration_since(UNIX_EPOCH) {
        let time_as_secs = time.as_millis();
        println!("cargo:rustc-env=BUILD_EPOCH={time_as_secs}");
        if let Ok(out) = Command::new("git")
            .args(["rev-parse", "--short", "HEAD"])
            .output()
        {
            if let Ok(stdout) = String::from_utf8(out.stdout) {
                println!("cargo:rustc-env=GIT_REV={}", stdout);
            }
        }
    }
}
