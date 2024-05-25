use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::i18n::use_i18n;

#[component]
pub fn contact() -> impl IntoView {
    let i18n = use_i18n();
    view! {

        <div class="flex flex-col h-full justify-between py-4 overflow-scroll md:overflow-visible">
        <p class="text-xl md:text-4xl">{t!(i18n, contact_title)}</p>
        <p class="text-xs md:text-xl">{t!(i18n, contact_subtitle)}</p>
        <div class="overflow-scroll md:overflow-visible">
            <form class="flex flex-col space-y-4" action="mailto:loic.labeye@pm.me" >
                <div>
                    <label for="base-input" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">{t!(i18n, contact.topic)}</label>
                    <input type="text" name="subject" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={{t!(i18n, contact.fill_here)}} />
                </div>
                <div>
                    <label for="message" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">{t!(i18n, contact.content)}</label>
                    <textarea type="text" name="body" id="body" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t!(i18n, contact.fill_here)}/>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t!(i18n, contact.send)}</button>
            </form>
        </div>
        <p class="flex flex-col row-span-1 col-span-full text-xs md:text-base">{t!(i18n, last_section)}</p>
        </div>

    }
}
