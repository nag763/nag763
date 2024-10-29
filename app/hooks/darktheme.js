'use client'

import React, { useEffect, useState } from "react";

export default function useDarkTheme() {

    const [useDarkTheme, setUseDarkTheme] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setUseDarkTheme(mediaQuery.matches);
        const handleChange = (event) => {
            setUseDarkTheme(event.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return useDarkTheme;
}
