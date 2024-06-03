use leptos::{component, view, IntoView};
use leptos_i18n::t;
use leptos_meta::Title;

use crate::i18n::use_i18n;

#[component]
pub fn index() -> impl IntoView {
    let i18n = use_i18n();
    view! {
        <Title text=t!(i18n, title.main_page)/>
        <div class="h-full grid grid-cols-10 grid-rows-10 2xl:text-xl">
            <div class="col-start-1 col-end-9 2xl:col-end-7 row-span-5 row-start-2 text-left space-y-2">
                <p class="text-2xl 2xl:text-8xl">"LABEYE Loïc"</p>
                <p class="pl-6 animate-fade-in-1">"💼  "{t!(i18n, job_title)}</p>
                <p class="pl-6 animate-fade-in-2">"🎂  "{t!(i18n, age)}</p>
                <p class="pl-6 animate-fade-in-3">"📍  "{t!(i18n, location)}</p>
            </div>
            <div class="col-start-2 2xl:col-start-6 col-end-10 text-left space-y-2 row-span-3 animate-fade-in-5">
            <h1>{t!(i18n, introduction)}</h1>

            </div>
            <p class="flex flex-col row-span-1 col-span-full animate-pulse animate-duration-[2000ms] animate-ease-in-out">{t!(i18n, scroll_down_to_continue)}</p>
        </div>
    }
}
