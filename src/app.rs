use leptos::*;
use leptos_i18n::{t, Locale};
use leptos_router::{Route, Router, Routes};

use crate::components::index::Index;
use crate::i18n::{provide_i18n_context, use_i18n};

static LOCALES : [crate::i18n::Locale; 2] = [crate::i18n::Locale::fr, crate::i18n::Locale::en];

#[component]
pub fn language_picker() -> impl IntoView{

    let i18n = use_i18n();
    let current_locale = i18n.get_locale().as_str();
    let (lang_val, set_lang) = create_signal(current_locale.to_string());

    view! {
        <select class="h-fit" on:change=move |ev| {
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
                    selected=lang_val.get() == locale_as_str
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
pub fn navbar() -> impl IntoView {
    view!{
        <nav class="flex justify-between col-start-2 col-end-12 items-center">
            <div class="font-extrabold content-center">
                <a href="/">
                "LABEYE Loïc"
                </a>
            </div>
            
            <div class="flex space-x-2 items-center">
                <LanguagePicker/>
            </div>
        </nav>
    }
}


#[component]
pub fn logo_to(path: &'static str, href: &'static str, #[prop(default="0 0 24 24")] viewbox: &'static str) -> impl IntoView {
    view! {

        <a href=href>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox=viewbox stroke="currentColor">
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
        <div class="flex justify-center text-white space-x-4">
            <LogoTo href="https://github.com/nag763" path="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.258.793-.577 0-.285-.012-1.04-.018-2.04-3.22.702-3.89-1.54-3.89-1.54-.525-1.327-1.282-1.68-1.282-1.68-1.048-.715.08-.702.08-.702 1.16.082 1.773 1.2 1.773 1.2 1.033 1.77 2.713 1.258 3.37.96.105-.748.405-1.26.737-1.546-2.586-.294-5.297-1.293-5.297-5.74 0-1.27.45-2.312 1.2-3.126-.12-.296-.522-1.482.114-3.08 0 0 1.008-.312 3.3 1.2a11.115 11.115 0 012.947-.4c1.002.007 2.007.135 2.947.4 2.29-1.512 3.297-1.2 3.297-1.2.636 1.598.234 2.784.114 3.08.75.814 1.2 1.856 1.2 3.126 0 4.458-2.715 5.442-5.305 5.728.42.36.795 1.068.795 2.15 0 1.55-.015 2.8-.015 3.18 0 .318.21.694.8.576C20.568 21.797 24 16.3 24 12c0-6.627-5.373-12-12-12z"/>
            <LogoTo href="mailto:loic.labeye@pm.me" path="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>

        </div> 
            <p>{t!(i18n, footer)}</p>

        </footer>
    }
}

#[component]
pub fn app() -> impl IntoView {

    provide_i18n_context();

    let i18n = use_i18n();

    view! {

        <Navbar/>
        <Router>
        <main>
            <Routes>
            <Route path="/" view=Index />
            <Route path="/*any" view=move || view! { <div class="h-full flex flex-col text-center justify-center align-center text-4xl text-bold"><p>"404"</p><p>{t!(i18n, does_not_exist)}</p></div> }/>
            </Routes>
        </main>
        </Router>
        <Footer/>
    }
}