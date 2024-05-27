/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ["./src/**/*.rs", "index.html"],
  theme: {
    extend: {
      animation: {
        'fade-in-1': 'fadeIn 1S ease-in-out',
        'fade-in-2': 'fadeIn 2S ease-in-out',
        'fade-in-3': 'fadeIn 3S ease-in-out',
        'fade-in-5': 'fadeIn 3S ease-in-out',
        'bounce-right': 'bounceRight 1s infinite',
      },  
      keyframes: {
        fadeIn : {
          '0%':  { opacity: 0 },
          '100%': { opacity: 1 }
        },
      },
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-10': 'span 10 / span 10',
      },
      height: {
        'dvh': '100dvh'
      },
      screens:{
        'taller': { 'raw': '(min-height: 800px)' }
      }
    },
  },
  plugins: [require('daisyui'), 
  require('tailwindcss-animated')],
}

