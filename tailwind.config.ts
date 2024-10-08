import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      sml: { max: "640px" },
      mdl: { max: "768px" },
      lgl: { max: "1024px" },
      xll: { max: "1280px" },
      tablet: { max: "768px" },
      laptop: { max: "1024px" },
      desktop: { max: "1280px" },
    },
    extend: {
      fontFamily: {
        SFProThin: "SFProThin",
        SFProLight: "SFProLight",
        SFProRegular: "SFProRegular",
        SFProSemiBold: "SFProSemiBold",
        SFProBold: "SFProBold",
        SFProRoundedBold: "SFProRoundedBold",
        InterThin: "InterThin",
        InterLight: "InterLight",
        InterRegular: "InterRegular",
        InterSemiBold: "InterSemiBold",
        InterBold: "InterBold",
      },
    },
    colors: {
      primary: "#000015",
      secondary: "#45AEF5",
      info: "#3A4362",
      warning: "#00FF47",
      green: "#00FF47",
      lightGreen:"#45F58B",
      "light-gray": "#CCCCCC",
      orange: "#FFA800",
      yellow: "#FFF000",
      red: "#E01E1E",
      divider: "rgba(217, 217, 217, 0.2)",
      "gray-900": "rgb(17 24 39)",
    },
  },
  plugins: [],
};
export default config;
