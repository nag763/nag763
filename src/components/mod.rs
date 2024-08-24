pub mod contact;
pub mod hobbies;
pub mod index;
pub mod post_scholarship;
pub mod projects;
pub mod scholarship;

pub(crate) mod common {
    use leptos::{component, view, IntoView};

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
}
