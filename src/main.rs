use leptos::{mount_to_body, view};
use leptos_meta::Title;
use leptos_router::Router;

use crate::app::App;

leptos_i18n::load_locales!();

mod app;
mod components;

pub fn main() {
    mount_to_body(move || {
        view! {
            <Router>
                <Title formatter=|text| format!("LABEYE Loïc CV - {text}") />
                <App/>
            </Router>
        }
    })
}
