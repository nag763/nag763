use cookie::SameSite;
use leptos::*;
use leptos_i18n::{t, Locale};
use leptos_router::{use_location, use_navigate, NavigateOptions, Route, Routes, A};
use leptos_use::utils::FromToStringCodec;
use leptos_use::{
    use_cookie_with_options, use_document, use_element_size, use_event_listener, use_timeout_fn,
    UseCookieOptions, UseElementSizeReturn, UseTimeoutFnReturn,
};
use std::ops::Div;
use std::str::FromStr;
use web_sys::js_sys::{Date, Number, Object};

use crate::components::contact::Contact;
use crate::components::hobbies::Hobbies;
use crate::components::index::Index;
use crate::components::post_scholarship::PostScholarship;
use crate::components::projects::Projects;
use crate::components::scholarship::Scholarship;
use crate::i18n::{provide_i18n_context, use_i18n};

static LOCALES: [crate::i18n::Locale; 3] = [
    crate::i18n::Locale::fr,
    crate::i18n::Locale::en,
    crate::i18n::Locale::de,
];

const ROUTE_ORDER: [&str; 6] = [
    "/",
    "/post_scholarship",
    "/scholarship",
    "/projects",
    "/hobbies",
    "/contact",
];

const COOKIE_CONSENT_TIME : i64 = 3600_000_i64*365;

#[component]
pub fn language_picker() -> impl IntoView {
    let i18n = use_i18n();
    let current_locale = i18n.get_locale().as_str();
    let (lang_val, set_lang) = create_signal(current_locale.to_string());

    view! {
        <select class="h-fit" aria-label="Language picker" on:change=move |ev| {
            let new_value = event_target_value(&ev);
            let locale = crate::i18n::Locale::find_locale(&[new_value.as_str()]);
            i18n.set_locale(locale);
            set_lang.set(new_value);
        }>
        <For
            each=move || LOCALES
            key=|locale| *locale
            children=move |locale: crate::i18n::Locale| {
                let locale_as_str = locale.as_str();
                view!{
                    <option
                    value=locale_as_str
                    selected=move || lang_val.get() == locale_as_str
                >
                    {locale_as_str}
                </option>
                }
            }
        />
        </select>
    }
}

#[component]
pub fn navbar(index_set: WriteSignal<Option<usize>>) -> impl IntoView {
    view! {
        <nav class="flex justify-between col-start-2 col-end-12 items-center">
            <div class="font-extrabold content-center">
                <A on:click=move|_| index_set.set(Some(0)) href="/">
                "LABEYE Loïc"
                </A>
            </div>

            <div class="flex space-x-2 items-center">
                <LanguagePicker/>
            </div>
        </nav>
    }
}

#[component]
pub fn logo_to(
    path: &'static str,
    href: &'static str,
    #[prop(default = "0 0 24 24")] viewbox: &'static str,
    #[prop(default = "w-3 h-3")] class: &'static str,
    #[prop(optional)] aria_label: &'static str,
) -> impl IntoView {
    view! {

        <a href=href>
            <svg xmlns="http://www.w3.org/2000/svg" class=class fill="none" aria-label=aria_label viewBox=viewbox stroke="currentColor">
                <path d=path/>
            </svg>
        </a>
    }
}

#[component]
pub fn footer() -> impl IntoView {
    let i18n = use_i18n();

    view! {
        <footer class="content-center text-xs flex flex-col space-y-2">
        <div class="flex justify-center text-black dark:text-white space-x-4">
            <LogoTo href="https://github.com/nag763" aria_label="Check out my Github !" path="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.258.793-.577 0-.285-.012-1.04-.018-2.04-3.22.702-3.89-1.54-3.89-1.54-.525-1.327-1.282-1.68-1.282-1.68-1.048-.715.08-.702.08-.702 1.16.082 1.773 1.2 1.773 1.2 1.033 1.77 2.713 1.258 3.37.96.105-.748.405-1.26.737-1.546-2.586-.294-5.297-1.293-5.297-5.74 0-1.27.45-2.312 1.2-3.126-.12-.296-.522-1.482.114-3.08 0 0 1.008-.312 3.3 1.2a11.115 11.115 0 012.947-.4c1.002.007 2.007.135 2.947.4 2.29-1.512 3.297-1.2 3.297-1.2.636 1.598.234 2.784.114 3.08.75.814 1.2 1.856 1.2 3.126 0 4.458-2.715 5.442-5.305 5.728.42.36.795 1.068.795 2.15 0 1.55-.015 2.8-.015 3.18 0 .318.21.694.8.576C20.568 21.797 24 16.3 24 12c0-6.627-5.373-12-12-12z"/>
            <LogoTo href="mailto:loic.labeye@pm.me" aria_label="Send me a mail!" path="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </div>
        <div class="flex flex-col">
            <p>{t!(i18n, footer)} </p>
            <p class="hidden taller:block" title=move || option_env!("GIT_REV")>{move || if let Some(build_time) = option_env!("BUILD_EPOCH") {
                let js_val = Number::from_str(build_time).unwrap();
                let date = Date::new(&js_val);
                let date = date.to_locale_date_string(i18n.get_locale().as_str(), &Object::new()).as_string();
                Some(t!(i18n, last_built_on, date))
            } else {
                None
            }}
            </p>
        </div>

        </footer>
    }
}

#[component]
pub fn main_component(
    index_val: ReadSignal<Option<usize>>,
    index_set: WriteSignal<Option<usize>>,
) -> impl IntoView {
    let el = create_node_ref();

    let i18n = use_i18n();

    let navigate_to_index = move |index: usize| {
        if let Some(route) = ROUTE_ORDER.get(index) {
            index_set.set(Some(index));
            use_navigate()(route, NavigateOptions::default());
        }
    };

    let _ = use_event_listener(use_document(), leptos::ev::keydown, move |evt| {
        if let Some(index_val) = index_val.get() {
            let new_index = match evt.key_code() {
                40 => index_val + 1,
                38 if index_val != 0 => index_val - 1,
                _ => return,
            };
            navigate_to_index(new_index)
        }
    });

    let _ = {
        // Used to detect double tap
        let UseTimeoutFnReturn {
            start,
            is_pending,
            stop,
            ..
        } = { use_timeout_fn(move |_: ()| {}, 400.0) };

        let UseElementSizeReturn { height, .. } = use_element_size(el);

        let _ = use_event_listener(el, leptos::ev::touchstart, move |evt| {
            if is_pending.get() {
                if let (Some(touch), Some(index_val)) = (evt.touches().get(0), index_val.get()) {
                    let half_height = height.get().div(2.0).trunc() as i32;
                    let new_index = match half_height < touch.client_y() {
                        true => index_val + 1,
                        _ if index_val != 0 => index_val - 1,
                        _ => return,
                    };
                    navigate_to_index(new_index)
                }
                evt.prevent_default();
                stop();
            } else {
                start(());
            }
        });
    };

    view! {
        <main node_ref=el>
            <Routes >
            <Route path="/" view=Index />
            <Route path="/post_scholarship" view=PostScholarship />
            <Route path="/scholarship" view=Scholarship  />
            <Route path="/projects" view=Projects />
            <Route path="/hobbies" view=Hobbies />
            <Route path="/contact" view=Contact />
            <Route path="/*any" view=move || view! { <div class="h-full flex flex-col text-center justify-center align-center text-4xl text-bold"><p>"404"</p><p>{t!(i18n, does_not_exist)}</p></div> }/>
            </Routes>
        </main>
    }
}

#[component]
pub fn cookie_consent(
    cookie_consent: Signal<std::option::Option<bool>>,
    set_cookie_consent: WriteSignal<Option<bool>>,
) -> impl IntoView {
    let i18n = use_i18n();

    view! {
        <dialog id="modal" class="modal modal-open" class:hidden=move ||cookie_consent.get().is_some()>
        <div class="modal-box w-11/12 max-w-5xl xl:text-left">
            <h3 class="text-lg">{t!(i18n, cookie_consent_required)}</h3>
            <p class="py-4">{t!(i18n, cookie_consent_more_info)}</p>
            <div class="modal-action">
            <button class="btn btn-primary" on:click=move|_| set_cookie_consent.set(Some(true))>{t!(i18n, cookie_consent_accept)}</button>
            </div>
        </div>
        </dialog>
    }
}

#[component]
pub fn app() -> impl IntoView {
    let location = use_location().pathname;

    let (cookie_consent, set_cookie_consent) = use_cookie_with_options::<bool, FromToStringCodec>(
        "cookie_consent",
        UseCookieOptions::default()
            .secure(true)
            .same_site(SameSite::Lax)
            .max_age(COOKIE_CONSENT_TIME),
    );

    let (index_val, index_set) = create_signal(
        ROUTE_ORDER
            .iter()
            .position(|route| *route == location.get()),
    );

    provide_i18n_context();

    move || {
        if cookie_consent.get().is_some() {
            view! {
                    <Navbar index_set/>
                    <MainComponent index_val index_set/>
                    <Footer/>
            }
        } else {
            view! {
                <>
                <CookieConsent cookie_consent set_cookie_consent/>
                </>
            }
        }
    }
}
