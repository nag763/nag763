use crate::i18n::use_i18n;
use i18n::*;
use leptos::*;
use leptos_i18n::t;


leptos_i18n::load_locales!();


pub fn main() {

    provide_i18n_context();
    let i18n = use_i18n();

    mount_to_body(move || {
        view! {
            <p>
            {t!(i18n, hello_world)}
            </p>
        }
    })
}
