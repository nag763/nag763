'use client'

import Image from "next/image";
import { useState, useCallback } from "react";
import { FaGithub } from "react-icons/fa6";

function Tabs({ shownExperience, handleTabClick, data }) {
    return data.map((e, i) => (<a key={e.name} role="tab" className={`tab ${e === shownExperience && "tab-active"}`}
        aria-selected={e === shownExperience} onClick={() => handleTabClick(e)}>{e.name}</a>));
}

export default function Browser({ data, translations }) {
    let [shownExperience, setShownExperience] = useState(data[0]);
    const handleTabClick = useCallback((project) => setShownExperience(project), []);
    return (
        <div className="mockup-browser border border-base-300 row-span-4 ">
            <div className="mockup-browser-toolbar">
                <div className="input border border-base-300"><a className="link link-hover" target="_blank" href={shownExperience.instance}>{shownExperience.instance}</a></div>
            </div>
            <div role="tablist" className="tabs mmd:tabs-bordered mmd:tabs-xs tabs-lifted px-2 ">
                <Tabs shownExperience={shownExperience} handleTabClick={handleTabClick} data={data} />
            </div>
            <div className="card lg:card-side md:h-auto max-h-full">
                <figure className="h-60 md:h-auto max-h-full md:w-1/3">
                    <Image src={shownExperience.img} height={800} width={600} className="md:max-h-full" alt={`${shownExperience.title} illustration`} />
                </figure>
                <div className="card-body h-2/3 md:h-auto md:w-2/3">
                    <h2 className="card-title">{shownExperience.name}     {shownExperience.shield && (
                        <Image
                            alt={`${shownExperience.name} shield`}
                            src={shownExperience.shield}
                            width={66}
                            height={15} 
                        />
                    )}</h2>
                    <p>{shownExperience.description}</p>
                    <div className="card-actions justify-end">
                        <a target="_blank" href={shownExperience.repo}>
                            <button className="btn btn-primary"><FaGithub />{translations.goto_gh}</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}