import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",  // Added from the second config
  ],
  theme: {
    screens: {
      xs: "321px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1080px",
      "2xl": "1281px",
      "3xl": "1536px",
      "4xl": "1649px",
      "4_2xl": "1880px",
      "5xl": "2048px",
    },
    extend: {
      lineHeight: {
        64: "4rem",
        52: "3.25rem",
        44: "2.75rem",
        40: "2.5rem",
        36: "2.25rem",
        32: "2rem",
        28: "1.75rem",
        24: "1.5rem",
        20: "1.25rem",
        16: "1rem",
      },
      fontSize: {
        "57": "3.563rem", // text-display-large
        "45": "2.813rem", // text-display-medium
        "36": "2.25rem",  // text-display-small
        "32": "2rem",     // text-headline-large
        "28": "1.75rem",  // text-headline-medium
        "24": "1.5rem",   // text-headline-small
        "22": "1.375rem", // text-title-large
        "16": "1rem",     // text-title-medium
        "14": "0.875rem", // text-title-small
        "12": "0.75rem",  // text-label-large
        "11": "0.688rem", // text-label-medium
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        opaq: "0 4px 16px 6px rgba(0,0,0,0.4)",
        full: "0 3px 1px -2px rgba(0,0,0, 0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        french: ["IM Fell French Canon", "serif"],
        DmSans: ["DM Sans"],
        roboto: ["Roboto", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        primarykey: "#3563E9", // 45f232
        onPrimary: "#FFFFFF",
        secondary: "#595D72",
        onSurface: "#1A1B21",
        onSurfaceVariant: "#45464F",
        background: "#F3F4F6",
        primaryText: "#637381",
        secondaryText: "#8899A8",
        stroke: "#DFE4EA",
        primary: {
          "0": "var(--primary-color-0)",
          "1": "var(--primary-color-1)",
          "2": "var(--primary-color-2)",
          "3": "var(--primary-color-3)",
          "4": "var(--primary-color-4)",
          "5": "var(--primary-color-5)",
          "6": "var(--primary-color-6)",
          "7": "var(--primary-color-7)",
          "8": "var(--primary-color-8)",
          "9": "var(--primary-color-9)",
          //default: "var(--primary-color-default)",
          text: "var(--primary-color-text)",
          body: "var(--primary-color-body)",
          background: "var(--primary-color-background)",
          border: "var(--primary-color-border)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
