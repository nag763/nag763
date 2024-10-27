'use client'

import React, { useEffect, useState } from "react";

export default function useDarkTheme() {

    const [useDarkTheme, setUseDarkTheme] = useState(() => {
        if(typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        } else {
            return false;
        }
    });

    useEffect(() => {
        // Crée une instance de MediaQueryList pour détecter le thème
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // Définir une fonction pour mettre à jour l'état en fonction du thème
        const handleChange = (event) => {
            setUseDarkTheme(event.matches);
        };

        // Ajouter un écouteur pour les changements du thème
        mediaQuery.addEventListener("change", handleChange);

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return useDarkTheme;
}
