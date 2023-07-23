/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["examples/**/*.vue"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
