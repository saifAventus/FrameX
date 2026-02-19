import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    files: ["./index.html", "./src/**/*.{ts,tsx,json}"],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
