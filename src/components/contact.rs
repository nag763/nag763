use crate::i18n::use_i18n;
use leptos::{
    component, create_signal, event_target_value, view, window, IntoView, SignalGet, SignalSet,
};
use leptos_i18n::t;
use leptos_meta::Title;

#[component]
pub fn contact() -> impl IntoView {
    let i18n = use_i18n();

    let (text_val, text_set) = create_signal(String::default());
    let (body_val, body_set) = create_signal(String::default());

    let onclick = move |_| {
        let (text, body) = (text_val.get(), body_val.get());
        let _ = window().location().replace(&format!(
            "mailto:loic.labeye@pm.me?subject={text}&body={body}"
        ));
    };

    view! {

        <Title text=t!(i18n, title.contact)/>
        <div class="flex flex-col h-full justify-between py-4 overflow-y-auto 2xl:overflow-visible animate-fade animate-fade animate-duration-100 animate-ease-in">
        <p class="text-xl 2xl:text-4xl">{t!(i18n, contact_title)}</p>
        <p class="text-xs 2xl:text-xl">{t!(i18n, contact_subtitle)}</p>
        <div class="overflow-y-auto 2xl:overflow-visible">
            <div class="flex flex-col space-y-4"  >
                <div>
                    <label for="base-input" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white" >{t!(i18n, contact.topic)}</label>
                    <input type="text" name="subject" id="base-input" class="input input-bordered w-full" on:input=move |ev| {text_set.set(event_target_value(&ev))}  placeholder={{t!(i18n, contact.fill_here)}} />
                </div>
                <div>
                    <label for="message" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">{t!(i18n, contact.content)}</label>
                    <textarea type="text" name="body" id="body" rows="4" class="textarea textarea-bordered w-full" placeholder={t!(i18n, contact.fill_here)}  on:input=move |ev| {body_set.set(event_target_value(&ev))} />
                </div>
                <button type="submit" class="btn btn-outline animate-pulse animate-duration-[2000ms] animate-ease-in-out animate-twice animate-delay-1000 animate-ease-in" on:click=onclick>{t!(i18n, contact.send)}</button>
            </div>
        </div>
        <p class="flex flex-col row-span-1 col-span-full text-xs 2xl:text-base">{t!(i18n, last_section)}</p>
        </div>

    }
}
