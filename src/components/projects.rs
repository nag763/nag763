use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::{components::common::ProjectCard, i18n::use_i18n};

#[component]
pub fn projects() -> impl IntoView {
    let i18n = use_i18n();
    view! {
        <div class="flex flex-col h-full justify-between py-4">
        <p class="text-4xl">{t!(i18n, projects_title)}</p>
        <p class="text-xl">{t!(i18n, projects_subtitle)}</p>
        <div class="grid grid-cols-2 gap-2">
            <ProjectCard title="tchatchers" img_src="/assets/tchatche.webp" description={t!(i18n, projects.tchatche.description)()} card_href="https://tchatche.xyz/" />
            <ProjectCard title="verbihr" img_src="/assets/verbihr.webp" description={t!(i18n, projects.verbihr.description)()} card_href="https://nag763.github.io/verbihr/" />
            <ProjectCard title="Snake game" img_src="/assets/snake.webp" description={t!(i18n, projects.snake.description)()} card_href="https://nag763.github.io/texas-snake/" />
            <ProjectCard title="Doteur" img_src="/assets/doteur.webp" description={t!(i18n, projects.doteur.description)()} card_href="https://nag763.github.io/doteur/" />
            </div>
        <p class="flex flex-col row-span-1 col-span-full animate-pulse">{t!(i18n, scroll_down_to_continue)}</p>

        </div>
    }
}
