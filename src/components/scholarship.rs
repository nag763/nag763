use leptos::{component, view, IntoView};
use leptos_i18n::t;
use leptos_meta::Title;

use crate::{components::common::Stepper, i18n::use_i18n};

#[component]
pub fn scholarship() -> impl IntoView {
    let i18n = use_i18n();

    view! {

    <Title text=t!(i18n, title.scholarship)/>
    <div class="flex flex-col h-full justify-between py-4 overflow-y-auto overflow-x-hidden items-center  2xl:items-stretch animate-fade animate-duration-100 animate-ease-in">
        <p class="text-xl 2xl:text-4xl row-span-1">{t!(i18n, scholarship_title )}</p>
        <ul class="timeline timeline-snap-icon mmd:timeline-compact timeline-vertical row-span-4 overflow-y-auto max-h-full overflow-x-hidden">
        <li>
          <hr />
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-start md:timeline-end text-start mb-10 animate-fade-left animate-duration-1000 animate-once animate-ease-in">
            <time class="font-mono italic">2021</time>
            <div class="text-lg font-black">{{t!(i18n, scholarship.graduated)}}</div>
          </div>
          <hr/>
        </li>
        <li>
          <hr />
          <div class="timeline-middle md:text-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-start mb-10 text-start md:text-end animate-fade-right animate-duration-1000  animate-once animate-delay-[500ms] animate-ease-in">
          <time class="font-mono italic">2019-2020</time>
          <div class="text-lg font-black">{{t!(i18n, scholarship.belgium)}}</div>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-start md:timeline-end text-start mb-10 animate-fade-left animate-duration-1000 animate-once animate-delay-[1000ms] animate-ease-in">
          <time class="font-mono italic">2017</time>
          <div class="text-lg font-black">{{t!(i18n, scholarship.ireland)}}</div>
          </div>
          <hr />
        </li>
        <li>
        <hr />
            <div class="timeline-middle md:text-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
            </div>
            <div class="timeline-start mb-10 text-start md:text-end animate-fade-right animate-duration-1000 animate-once animate-delay-[1500ms] animate-ease-in">
            <time class="font-mono italic">2016</time>
            <div class="text-lg font-black">{{t!(i18n, scholarship.rouen)}}</div>
            </div>
        </li>
      </ul>

      <Stepper class="w-full"/>
      </div>


    }
}
