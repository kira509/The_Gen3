/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#e50914", // Netflix red
        dark: "#0d0d0d",
        zincGlass: "rgba(24, 24, 27, 0.7)",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        sm: "4px",
      },
      animation: {
        fade: "fadeIn 1s ease-in-out",
        bounceIn: "bounceIn 0.8s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        bounceIn: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "60%": { transform: "scale(1.05)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
