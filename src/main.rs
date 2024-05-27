use leptos::{mount_to_body, view};
use leptos_router::Router;

use crate::app::App;

leptos_i18n::load_locales!();

mod app;
mod components;

pub fn main() {
    console_error_panic_hook::set_once();

    mount_to_body(move || {
        view! {
            <Router>
                <App/>
            </Router>
        }
    })
}
