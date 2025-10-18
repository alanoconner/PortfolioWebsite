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
        'terminal-green': '#00ff41',
        'terminal-cyan': '#00ffff',
        'terminal-yellow': '#ffff00',
        'terminal-red': '#ff0040',
        'gray-150': '#e5e5e5',
        'gray-250': '#d1d1d1',
      }
    },
  },
}
