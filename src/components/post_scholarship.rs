use leptos::{component, view, IntoView};
use leptos_i18n::t;

use crate::i18n::use_i18n;

#[component]
pub fn post_scholarship() -> impl IntoView {
    let i18n = use_i18n();
    view! {
        <div class="grid grid-rows-6 2xl:flex 2xl:flex-col items-center 2xl:items-stretch 2xl:justify-between py-4 overflow-y-auto animate-fade animate-duration-100 animate-ease-in">
        <h1 class="row-span-1 text-xl 2xl:text-4xl max-xl:hidden">{t!(i18n, post_scholarship_title)}</h1>
        <ul class="timeline timeline-snap-icon mmd:timeline-compact timeline-vertical row-span-4 overflow-y-auto max-h-full">
        <li >
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-start text-start md:text-end mb-10 animate-fade-right animate-once animate-ease-in">
            <time class="font-mono italic">{{t!(i18n, post_scholarship.allianz_trade.since_2021)}}</time>
            <div class="text-lg font-black">{{t!(i18n, post_scholarship.allianz_trade.it_consultant)}}</div>
            <p>{t!(i18n, post_scholarship.allianz_trade.mission)}</p>
            <small><span class="underline">{t!(i18n, tools)}</span>{t!(i18n, post_scholarship.allianz_trade.tools_used)}</small>
          </div>
          <hr/>
        </li>
        <li>
          <hr />
          <div class="timeline-middle md:text-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-end mb-10 text-start  animate-fade-left animate-once animate-delay-[500ms] animate-ease-in">
          <time class="font-mono italic">{{t!(i18n, post_scholarship.internship.since_2021)}}</time>
          <div class="text-lg font-black">{{t!(i18n, post_scholarship.internship.it_consultant)}}</div>
          <p>{t!(i18n, post_scholarship.internship.mission)}</p>
          <small><span class="underline">{t!(i18n, tools)}</span>{t!(i18n, post_scholarship.internship.tools_used)}</small>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-start text-start md:text-end mb-10 animate-fade-right animate-once animate-delay-[1000ms] animate-ease-in">
          <time class="font-mono italic">{{t!(i18n, post_scholarship.sustainecho.since_2021)}}</time>
          <div class="text-lg font-black">{{t!(i18n, post_scholarship.sustainecho.it_consultant)}}</div>
          <p>{t!(i18n, post_scholarship.sustainecho.mission)}</p>
          <small><span class="underline">{t!(i18n, tools)}</span>{t!(i18n, post_scholarship.sustainecho.tools_used)}</small>
          </div>
          <hr />
        </li>
      </ul>
    <div class="flex flex-col row-span-1 col-span-full animate-pulse animate-duration-[2000ms] animate-ease-in-out"><p>{t!(i18n, scroll_down_to_continue)}</p></div>
    </div>


    }
}
