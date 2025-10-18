/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Courier New', 'Monaco', 'monospace'],
      },
      colors: {
        'off-white': '#f8f8f8',
        'text-gray': '#454545',
      }
    },
  },
}
