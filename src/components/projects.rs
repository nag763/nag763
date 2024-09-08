use leptos::{component, create_signal, view, IntoView, SignalGet, SignalSet};
use leptos_i18n::t;
use leptos_meta::Title;

use crate::i18n::use_i18n;

#[component]
fn card(
    img_ref: &'static str,
    title: &'static str,
    description: &'static str,
    github_repo: &'static str,
    #[prop(optional)] shield: &'static str,
    hidden: impl Fn() -> bool + 'static,
) -> impl IntoView {
    let i18n = use_i18n();
    view! {
        <div class="card md:card-side max-h-full items-center mmd:text-white" class:hidden=hidden>
            <figure class="mmd:w-full md:w-1/3 md:h-full"><img class="md:h-full object-contain" src=img_ref alt="Illustration"/></figure>
            <div class="card-body text-left md:w-2/3">
            <h2 class="card-title mmd:text-sm">{title}<img src=shield/></h2>
            <p class="mmd:text-xs">{description}</p>
            <div class="card-actions justify-end">
            <a href=github_repo target="_blank">
                <button class="btn btn-primary mmd:btn-xs"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-6 md:h-6" fill="none" aria-label="Check out my Github !" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.258.793-.577 0-.285-.012-1.04-.018-2.04-3.22.702-3.89-1.54-3.89-1.54-.525-1.327-1.282-1.68-1.282-1.68-1.048-.715.08-.702.08-.702 1.16.082 1.773 1.2 1.773 1.2 1.033 1.77 2.713 1.258 3.37.96.105-.748.405-1.26.737-1.546-2.586-.294-5.297-1.293-5.297-5.74 0-1.27.45-2.312 1.2-3.126-.12-.296-.522-1.482.114-3.08 0 0 1.008-.312 3.3 1.2a11.115 11.115 0 012.947-.4c1.002.007 2.007.135 2.947.4 2.29-1.512 3.297-1.2 3.297-1.2.636 1.598.234 2.784.114 3.08.75.814 1.2 1.856 1.2 3.126 0 4.458-2.715 5.442-5.305 5.728.42.36.795 1.068.795 2.15 0 1.55-.015 2.8-.015 3.18 0 .318.21.694.8.576C20.568 21.797 24 16.3 24 12c0-6.627-5.373-12-12-12z"></path></svg> {t!(i18n, check_out_on_github)}</button>
            </a>
            </div>
            </div>
        </div>
    }
}

const WEBSITES: [&str; 4] = [
    "https://tchatche.xyz",
    "https://nag763.github.io/doteur/live",
    "https://nag763.github.io/verbihr",
    "https://nag763.github.io/texas-snake",
];

#[component]
pub fn projects() -> impl IntoView {
    let i18n = use_i18n();
    let (tab_index_val, tab_index_set) = create_signal(0usize);

    view! {
        <Title text=t!(i18n, title.projects)/>
        <div class="flex flex-col gap-1 items-center justify-between  py-4 overflow-y-auto 2xl:overflow-visible animate-fade animate-duration-100 animate-ease-in">
        <p class="text-xl 2xl:text-4xl row-span-1 justify-items-center ">{t!(i18n, projects_title)}</p>
        <div class="mockup-phone w-5/6 md:hidden ">
                <div role="tablist" class="tabs mmd:tabs-bordered mmd:tabs-xs md:tabs-lifted px-2 overflow-x-auto">
                <a role="tab" class="tab text-primary" class:tab-active=move|| tab_index_val.get()==0 on:click=move|_| tab_index_set.set(0)>tchatchers</a>
                <a role="tab" class="tab text-primary" class:tab-active=move|| tab_index_val.get()==1 on:click=move|_| tab_index_set.set(1)>doteur</a>
                <a role="tab" class="tab text-primary" class:tab-active=move|| tab_index_val.get()==2 on:click=move|_| tab_index_set.set(2)>verbihr</a>
                <a role="tab" class="tab text-primary" class:tab-active=move|| tab_index_val.get()==3 on:click=move|_| tab_index_set.set(3)>snake</a>
                </div>
                <div class="phone-1 flex flex-col">
                <Card hidden=move || tab_index_val.get() != 0 img_ref="assets/tchatche.webp" title="tchatchers" description={t!(i18n, projects.tchatche.description)()} github_repo="https://github.com/nag763/tchatchers" shield="https://img.shields.io/github/stars/nag763/tchatchers?style=social" />
                <Card hidden=move || tab_index_val.get() != 1  img_ref="assets/doteur.webp" title="doteur" description={t!(i18n, projects.doteur.description)()} github_repo="https://github.com/nag763/doteur" shield="https://img.shields.io/github/stars/nag763/doteur?style=social" />
                <Card hidden=move || tab_index_val.get() != 2  img_ref="assets/verbihr.webp" title="verbihr" description={t!(i18n, projects.verbihr.description)()} github_repo="https://github.com/nag763/verbihr" />
                <Card hidden=move || tab_index_val.get() != 3  img_ref="assets/snake.webp" title="snake" description={t!(i18n, projects.snake.description)()} github_repo="https://github.com/nag763/texas-snake" />

            </div>

        </div>
        <div class="mockup-browser border border-base-300 row-span-4 hidden md:block md:w-full">
            <div class="mockup-browser-toolbar">
            <div class="input border border-base-300 link"><a class="link" href=move || WEBSITES[tab_index_val.get()] target="_blank">{move || WEBSITES[tab_index_val.get()]}</a></div>
            </div>
            <div role="tablist" class="tabs mmd:tabs-bordered mmd:tabs-xs md:tabs-lifted px-2 ">
            <a role="tab" class="tab" class:tab-active=move|| tab_index_val.get()==0 on:click=move|_| tab_index_set.set(0)>tchatchers</a>
            <a role="tab" class="tab" class:tab-active=move|| tab_index_val.get()==1 on:click=move|_| tab_index_set.set(1)>doteur</a>
            <a role="tab" class="tab" class:tab-active=move|| tab_index_val.get()==2 on:click=move|_| tab_index_set.set(2)>verbihr</a>
            <a role="tab" class="tab" class:tab-active=move|| tab_index_val.get()==3 on:click=move|_| tab_index_set.set(3)>snake</a>
            </div>
                <Card hidden=move || tab_index_val.get() != 0 img_ref="assets/tchatche.webp" title="tchatchers" description={t!(i18n, projects.tchatche.description)()} github_repo="https://github.com/nag763/tchatchers" shield="https://img.shields.io/github/stars/nag763/tchatchers?style=social" />
                <Card hidden=move || tab_index_val.get() != 1  img_ref="assets/doteur.webp" title="doteur" description={t!(i18n, projects.doteur.description)()} github_repo="https://github.com/nag763/doteur" shield="https://img.shields.io/github/stars/nag763/doteur?style=social" />
                <Card hidden=move || tab_index_val.get() != 2  img_ref="assets/verbihr.webp" title="verbihr" description={t!(i18n, projects.verbihr.description)()} github_repo="https://github.com/nag763/verbihr" />
                <Card hidden=move || tab_index_val.get() != 3  img_ref="assets/snake.webp" title="snake" description={t!(i18n, projects.snake.description)()} github_repo="https://github.com/nag763/texas-snake" />

        </div>
        <p class="row-span-1 mmd:text-sm h-auto col-span-full animate-pulse animate-duration-[2000ms] animate-ease-in-out">{t!(i18n, scroll_down_to_continue, <kbd> = |children| view!{<kbd class="kbd">{children}</kbd>})}</p>
        </div>
    }
}
