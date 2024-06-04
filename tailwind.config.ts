import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
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
          default: "var(--primary-color-default)",
          text: "var(--primary-color-text)",
          body: "var(--primary-color-body)",
          background: "var(--primary-color-background)",
          border: "var(--primary-color-border)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
