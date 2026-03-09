/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.js',   // scan templates.js and pages.js for Tailwind classes
  ],
  theme: { extend: {} },
  plugins: [],
};