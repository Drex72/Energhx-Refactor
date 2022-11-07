/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,tsx,tsx}",
    "./components/**/*.{js,ts,tsx,tsx}",
  ],
  theme: {
    screens: {
      tablet: "800px",
      // => @media (min-width: 800px) { ... }
      md: "801px",
    },
    extend: {
      
    },
  },
  plugins: [],
};
