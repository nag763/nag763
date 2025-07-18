import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

export default defineConfig({
  compressHTML: true,

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [react()],
});