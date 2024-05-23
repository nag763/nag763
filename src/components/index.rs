use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::i18n::use_i18n;

#[component]
pub fn index() -> impl IntoView {
    let i18n = use_i18n();

    view! { <h1>{t!(i18n, hello_world)}</h1> }
}
