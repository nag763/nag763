use leptos::{component, view, IntoView};
use leptos_i18n::t;
use leptos_meta::Title;

use crate::i18n::use_i18n;

#[component]
pub fn contact() -> impl IntoView {
    let i18n = use_i18n();
    view! {

        <Title text=t!(i18n, title.contact)/>
        <div class="flex flex-col h-full justify-between py-4 overflow-y-auto 2xl:overflow-visible animate-fade animate-fade animate-duration-100 animate-ease-in">
        <p class="text-xl 2xl:text-4xl">{t!(i18n, contact_title)}</p>
        <p class="text-xs 2xl:text-xl">{t!(i18n, contact_subtitle)}</p>
        <div class="overflow-y-auto 2xl:overflow-visible">
            <form class="flex flex-col space-y-4" action="mailto:loic.labeye@pm.me" >
                <div>
                    <label for="base-input" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">{t!(i18n, contact.topic)}</label>
                    <input type="text" name="subject" id="base-input" class="input input-bordered w-full" placeholder={{t!(i18n, contact.fill_here)}} />
                </div>
                <div>
                    <label for="message" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">{t!(i18n, contact.content)}</label>
                    <textarea type="text" name="body" id="body" rows="4" class="input input-bordered w-full" placeholder={t!(i18n, contact.fill_here)}/>
                </div>
                <button type="submit" class="btn btn-outline animate-pulse animate-duration-[2000ms] animate-ease-in-out animate-twice animate-delay-1000 animate-ease-in">{t!(i18n, contact.send)}</button>
            </form>
        </div>
        <p class="flex flex-col row-span-1 col-span-full text-xs 2xl:text-base">{t!(i18n, last_section)}</p>
        </div>

    }
}
