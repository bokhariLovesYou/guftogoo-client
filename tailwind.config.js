module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-primary": {
          DEFAULT: "#5300dc",
          hover: "#3b009d",
        },
        "theme-secondary": {
          DEFAULT: "#1500d7",
          hover: "#1000a0",
        },
        "theme-panel": {
          DEFAULT: "#eef0f8",
          hover: "#e4e7f4",
        },
        "theme-heading": {
          DEFAULT: "#000",
        },
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.33333336%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
