/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#424b5b",
        brandYellow: "#f5b335"
      }
    }
  },
  plugins: []
};


