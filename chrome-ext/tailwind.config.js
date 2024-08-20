/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './dist/*.html','./popup.html',
    './content.js'
  ],
  theme: {
    extend: {},
  },
  plugins:  [require('daisyui')],
  daisyui: {
    themes: [
          "dim",
          "autumn",
          "dark",
          "cupcake",
          "retro",
          "night",
          {mytheme: {
            "primary": "#1C212B",
          },
        }
        ],
      },
  };


