use leptos::{component, view, IntoView};
use leptos_i18n::t;
use leptos_meta::Title;

use crate::{components::common::ProjectCard, i18n::use_i18n};

#[component]
pub fn hobbies() -> impl IntoView {
    let i18n = use_i18n();
    view! {

        <Title text=t!(i18n, title.hobbies)/>
        <div class="flex flex-col h-full justify-between py-4 overflow-y-auto 2xl:overflow-visible animate-fade animate-duration-100 animate-ease-in">
        <p class="text-xl 2xl:text-4xl">{t!(i18n, hobbies_title)}</p>
        <div class="flex flex-col 2xl:grid 2xl:grid-cols-3 gap-2 overflow-y-auto 2xl:overflow-visible">
            <ProjectCard title={t!(i18n, hobbies.coding.title)()}  img_src="/assets/florian-olivo-4hbJ-eymZ1o-unsplash.webp" description={t!(i18n, hobbies.coding.description)()}  />
            <ProjectCard title={t!(i18n, hobbies.travelling.title)()}  img_src="/assets/ross-parmly-rf6ywHVkrlY-unsplash.webp" description={t!(i18n, hobbies.travelling.description)()} />
            <ProjectCard title={t!(i18n, hobbies.music.title)()} img_src="/assets/blocks-T3mKJXfdims-unsplash.webp" description={t!(i18n, hobbies.music.description)()} />
            <ProjectCard title={t!(i18n, hobbies.books.title)()} img_src="/assets/gulfer-ergin-LUGuCtvlk1Q-unsplash.webp" description={t!(i18n, hobbies.books.description)()} />
            <ProjectCard title={t!(i18n, hobbies.hiking.title)()} img_src="/assets/tobias-cornille-j2KI6FTc3jA-unsplash.webp" description={t!(i18n, hobbies.hiking.description)()} />
            <ProjectCard title={t!(i18n, hobbies.football.title)()} img_src="/assets/vienna-reyes-qCrKTET_09o-unsplash.webp" description={t!(i18n, hobbies.football.description)()} />

            </div>
        <p class="flex flex-col row-span-1 col-span-full animate-pulse animate-duration-[2000ms] animate-ease-in-out">{t!(i18n, scroll_down_to_continue)}</p>

        </div>
    }
}
