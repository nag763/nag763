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
        #[prop(optional, default("#"))] card_href: &'static str,
    ) -> impl IntoView {
        view! {
            <div >
                <a href=card_href target={match card_href { "#" => "" , _ => "_blank"}} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 h-full">
                <img class="object-cover w-full rounded-t-lg h-24 md:h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src=img_src alt="" />
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <p class="mb-3 font-normal text-sm md:text-base text-gray-700 dark:text-gray-400">{description}</p>
                </div>
                </a>
            </div>
        }
    }
}
