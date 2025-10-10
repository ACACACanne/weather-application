/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx}",
    "./src/components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};


