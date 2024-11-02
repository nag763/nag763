'use client'

import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

export default function Browser({ data, translations }) {
    let [shownExperience, setShownExperience] = useState(data[0]);
    return (
        <div className="mockup-browser border border-base-300 row-span-4 md:block">
            <div className="mockup-browser-toolbar">
                <div className="input border border-base-300 link"><a className="link" target="_blank" href={shownExperience.instance}>{shownExperience.instance}</a></div>
            </div>
            <div role="tablist" className="tabs mmd:tabs-bordered mmd:tabs-xs md:tabs-lifted px-2 ">
                {data.map((e, i) => {
                    return (<a key={e.name} role="tab" className={`tab ${e === shownExperience && "tab-active"}`} onClick={() => setShownExperience(data[i])}>{e.name}</a>)
                })}
            </div>
            <div className="card lg:card-side max-h-full">
                <figure className=" w-1/3">
                    <Image src={shownExperience.img} height={800} width={600} className="max-h-full" alt={`${shownExperience.title} illustration`} />
                </figure>
                <div className="card-body  w-2/3">
                    <h2 className="card-title">{shownExperience.name}</h2>
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