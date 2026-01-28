/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#d6e9ff",
          200: "#b1d5ff",
          300: "#84b8ff",
          400: "#5796ff",
          500: "#336dff",
          600: "#1f52db",
          700: "#183faa",
          800: "#142f7a",
          900: "#101f4d"
        }
      }
    }
  },
  plugins: []
};
