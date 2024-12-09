import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "dark": "#001a0b",
        "less-dark": "#01210f",
      },
      fontFamily: {
        mina: ["Mina", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
