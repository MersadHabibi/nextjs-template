import tailwindReactAria from "tailwindcss-react-aria-components";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  plugins: [
    tailwindReactAria({
      prefix: "rac",
    }),
  ],
};
