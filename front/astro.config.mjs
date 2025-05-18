import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    compressHTML: true,
    vite: {
        plugins: [tailwindcss()],
    },
});