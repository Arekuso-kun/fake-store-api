import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf6fc",
          100: "#fbecfa",
          200: "#f7d7f4",
          300: "#f0b7e8",
          400: "#e58dd6",
          500: "#d560c2",
          600: "#b940a4",
          700: "#993284",
          800: "#802c6e",
          900: "#672858",
          950: "#430f37",
          foreground: "#fff",
          background: "#000",
          DEFAULT: "#802c6e",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
export default config;
