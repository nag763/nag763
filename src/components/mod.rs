pub mod contact;
pub mod hobbies;
pub mod index;
pub mod post_scholarship;
pub mod projects;
pub mod scholarship;

pub(crate) mod common {
    use crate::i18n::use_i18n;
    use leptos::{
        component, use_context, view, For, IntoView, ReadSignal, SignalGet, SignalSet, WriteSignal,
    };
    use leptos_i18n::t;

    #[component]
    pub(crate) fn project_card(
        title: &'static str,
        img_src: &'static str,
        description: &'static str,
    ) -> impl IntoView {
        view! {
            <div >
                <div class="flex flex-col items-center bg-white border border-gray-500 rounded-lg shadow 2xl:flex-row 2xl:max-w-xl hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 h-full">
                <img class="object-cover w-full rounded-t-lg h-24 2xl:h-96 2xl:h-auto 2xl:w-48 2xl:rounded-none" src=img_src alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-lg 2xl:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p class="mb-3 font-normal text-sm 2xl:text-base text-gray-700 dark:text-gray-400">{description}</p>
                </div>
                </div>
            </div>
        }
    }

    #[component]
    pub fn stepper(#[prop(optional)] class: &'static str) -> impl IntoView {
        let i18n = use_i18n();
        let (index_val, index_set) =
            use_context::<(ReadSignal<Option<usize>>, WriteSignal<Option<usize>>)>()
                .expect("to have found the setter provided");
        let is_index_superior_or_eq_to = move |val: usize| {
            let Some(index) = index_val.get() else {
                return false;
            };
            return val <= index;
        };

        let change_index_val_to = move |val: usize| {
            index_set.set(Some(val));
        };

        let get_step_for_index = move |i: usize| match i {
            0 => t!(i18n, title.main_page)(),
            1 => t!(i18n, title.post_scholarship)(),
            2 => t!(i18n, title.scholarship)(),
            3 => t!(i18n, title.projects)(),
            4 => t!(i18n, title.hobbies)(),
            5 => t!(i18n, title.contact)(),
            _ => "",
        };

        view! {
        <div class={class}>
            <p class="row-span-1 mmd:text-sm h-auto col-span-full animate-pulse animate-duration-[2000ms] animate-ease-in-out md:hidden" md:hidden>{t!(i18n, scroll_down_to_continue, <kbd> = |children| view!{<kbd class="kbd">{children}</kbd>})}</p>
            <ul class="steps animate-duration-[1ms] w-full mmd:hidden">
                <For
                each=move || (0usize..6usize)
                key=|index| *index
                children=move |index| view!{
                    <li class="step mlg:text-xs mmd:after:!w-5 mmd:after:!h-5 mmd:after:text-xs mmd:before:!h-1 mmd:text-hide cursor-pointer" class:step-primary=move|| is_index_superior_or_eq_to(index) on:click=move|_|change_index_val_to(index)>{move || get_step_for_index(index)}</li>
                    }
                />
            </ul>
        </div>
        }
    }
}
