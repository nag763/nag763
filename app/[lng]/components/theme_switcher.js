'use client'


import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function ThemeSwitcher() {
    const [darkPreferred, setDarkPreferred] = useState(false);

    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkPreferred(matchMedia.matches);

        const handler = (event) => setDarkPreferred(event.matches);
        matchMedia.addEventListener('change', handler);

        return () => {
            matchMedia.removeEventListener('change', handler);
        };
    }, []);

    return (
        <label className="grid cursor-pointer place-items-center">
            <input
                type="checkbox"
                value={darkPreferred ? "light" : "dark"}
                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 hidden dark:block" />

            <IoMdSunny aria-label="Sunny icon"
                className="stroke-base-100 fill-base-100 row-start-1 col-start-1 dark:col-start-2">
            </IoMdSunny>
            <IoMdMoon aria-label="Moon icon"
                className="stroke-base-100 fill-base-100 row-start-1 col-start-2 dark:col-start-1">
            </IoMdMoon>

        </label>
    )
}