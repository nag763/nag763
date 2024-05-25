use leptos::{mount_to_body, view};

use crate::app::App;

leptos_i18n::load_locales!();

mod app;
mod components;

pub fn main() {
    mount_to_body(move || {
        view! {
            <App/>
        }
    })
}
