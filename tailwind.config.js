/** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           'blue-dark': '#1E3A8A',
           'gray-light': '#F3F4F6',
           'white': '#FFFFFF',
         },
       },
     },
     plugins: [],
   }