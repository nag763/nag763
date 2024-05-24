use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::i18n::use_i18n;

#[component]
pub fn project_card(
    title: &'static str,
    img_src: &'static str,
    description: &'static str,
    card_href: &'static str,
) -> impl IntoView {
    view! {
        <div>
            <a href=card_href target="_blank" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src=img_src alt="" />
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            </div>
            </a>
        </div>
    }
}

#[component]
pub fn projects() -> impl IntoView {
    let i18n = use_i18n();
    view! {
        <div class="flex flex-col h-full justify-between py-4">
        <p class="text-4xl">{t!(i18n, projects_title)}</p>
        <p class="text-xl">{t!(i18n, projects_subtitle)}</p>
        <div class="grid grid-cols-2 space-y-2">
            <ProjectCard title="tchatchers" img_src="/assets/tchatche.png" description={t!(i18n, projects.tchatche.description)()} card_href="https://tchatche.xyz/" />
            <ProjectCard title="verbihr" img_src="/assets/verbihr.png" description={t!(i18n, projects.verbihr.description)()} card_href="https://nag763.github.io/verbihr/" />
            <ProjectCard title="Snake game" img_src="/assets/snake.png" description={t!(i18n, projects.snake.description)()} card_href="https://nag763.github.io/texas-snake/" />
            <ProjectCard title="Doteur" img_src="/assets/doteur.png" description={t!(i18n, projects.doteur.description)()} card_href="https://nag763.github.io/doteur/" />
            </div>
        <p class="flex flex-col row-span-1 col-span-full animate-pulse">{t!(i18n, scroll_down_to_continue)}</p>

        </div>
    }
}
