/** @type {import('tailwindcss').Config} */
 import daisyui from 'daisyui';

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#8AAAE5",
          "secondary": "#00246B"
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "#2a303c",
          "primary": "#CADCFC",
          "secondary": "#735DA5"
        },
      },
    ],
  },

  plugins: [daisyui, "prettier-plugin-tailwindcss", require('tailwindcss-animated')],
};
