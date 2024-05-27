use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::i18n::use_i18n;

#[component]
pub fn chat_like_li(
    image_ref: &'static str,
    #[prop(default = "image")] image_alt: &'static str,
    content: &'static str,
    time: &'static str,
) -> impl IntoView {
    view! {
        <li class="mb-10 ms-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full 2xl:-start-3 ring-2 ring-black dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg" src=image_ref alt=image_alt/>
        </span>
        <div class="items-center justify-between p-4 bg-white border border-gray-500 rounded-lg shadow-sm sm:flex dark:bg-gray-800 dark:border-gray-600">
            <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{time}</time>
            <div class="text-sm font-normal text-gray-500 dark:text-gray-300">{content}</div>
        </div>
    </li>
    }
}

#[component]
pub fn scholarship() -> impl IntoView {
    let i18n = use_i18n();

    view! {
    <div class="grid grid-rows-6 2xl:flex 2xl:flex-col flex flex-col h-full justify-center 2xl:justify-between py-4 overflow-y-auto 2xl:overflow-visible items-center  2xl:items-stretch">
        <p class="text-xl 2xl:text-4xl row-span-1">{t!(i18n, scholarship_title )}</p>
        <ol class="relative border-s border-gray-200 dark:border-gray-700 row-span-4 h-full 2xl:h-auto overflow-y-auto 2xl:overflow-visible  ">
        <ChatLikeLi image_ref="assets/university.webp" image_alt="University" content={t!(i18n, scholarship.graduated)()} time="2021" />
        <ChatLikeLi image_ref="assets/atomium.webp" image_alt="Belgium" content={t!(i18n, scholarship.belgium)()} time="2019-2020"  />
        <ChatLikeLi image_ref="assets/irish.webp" image_alt="Dublin" content={t!(i18n, scholarship.ireland)()} time="Summer 2017" />
        <ChatLikeLi image_ref="assets/university.webp" image_alt="University" content={t!(i18n, scholarship.rouen)()} time="2016" />
        </ol>
        <p class="flex flex-col row-span-1 col-span-full animate-pulse">{t!(i18n, scroll_down_to_continue)}</p>
    </div>


    }
}
