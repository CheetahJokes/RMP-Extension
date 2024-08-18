/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './dist/*.html','./popup.html',
    './popup.js'
  ],
  theme: {
    extend: {},
  },
  plugins:  [require('daisyui')],
}

