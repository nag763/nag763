use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::i18n::use_i18n;

#[component]
pub fn post_scholarship() -> impl IntoView {
    let i18n = use_i18n();
    view! {
        <div class="grid grid-rows-6 2xl:flex 2xl:flex-col items-center 2xl:items-stretch 2xl:justify-between py-4 overflow-y-auto 2xl:overflow-visible">
        <h1 class="row-span-1 max-h-full text-xl 2xl:text-4xl">{t!(i18n, post_scholarship_title)}</h1>
        <ol class="relative border-s border-black dark:border-gray-800 text-left row-span-4 h-full 2xl:h-auto overflow-y-auto 2xl:overflow-visible  2xl:text-left">
        <li class="mb-10 ms-4">
            <div class="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-black dark:border-gray-900 dark:bg-gray-800"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{t!(i18n, post_scholarship.allianz_trade.since_2021)}</time>
            <h3 class="2xl:text-lg font-semibold text-gray-900 dark:text-white">{t!(i18n, post_scholarship.allianz_trade.it_consultant)}</h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{t!(i18n, post_scholarship.allianz_trade.mission)}</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"><span class="underline">{t!(i18n, tools)}</span>{t!(i18n, post_scholarship.allianz_trade.tools_used)}</p>
        </li>
        <li class="mb-10 ms-4">
            <div class="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-black dark:border-gray-900 dark:bg-gray-800"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{t!(i18n, post_scholarship.internship.since_2021)}</time>
            <h3 class="2xl:text-lg font-semibold text-gray-900 dark:text-white">{t!(i18n, post_scholarship.internship.it_consultant)}</h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{t!(i18n, post_scholarship.internship.mission)}</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"><span class="underline">{t!(i18n, tools)}</span>{t!(i18n, post_scholarship.internship.tools_used)}</p>
        </li>
        <li class="ms-4">
            <div class="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-black dark:border-gray-900 dark:bg-gray-800"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{t!(i18n, post_scholarship.sustainecho.since_2021)}</time>
            <h3 class="2xl:text-lg font-semibold text-gray-900 dark:text-white">{t!(i18n, post_scholarship.sustainecho.it_consultant)}</h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{t!(i18n, post_scholarship.sustainecho.mission)}</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"><span class="underline">{t!(i18n, tools)}</span>{t!(i18n, post_scholarship.sustainecho.tools_used)}</p>
        </li>
    </ol>
    <div class="flex flex-col row-span-1 col-span-full animate-pulse"><p>{t!(i18n, scroll_down_to_continue)}</p></div>
    </div>


    }
}
