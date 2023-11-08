/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "soft-small": "0px 10px 18px -2px #0a090b12",
      },
      colors: {
        brand: {
          DEFAULT: "#FF6600",
        },
        independant: {
          grey: {
            active: "#0A090B",
            subtle: "#F1F1F1",
            DEFAULT: "#4F4D55",
            inactive: "#DCDCDE",
            background: "#F8F8F8",
          },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
