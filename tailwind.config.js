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
      "light",
      "dracula",
    ],
  },
  plugins: [daisyui, require('tailwindcss-animated')],
};
