import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          night: "#14283F",
          teal: "#176B66",
          accent: "#D49A43",
        },
        surface: {
          base: "#F5F7F8",
          border: "#DCE4EA",
        },
      },
    },
  },
  plugins: [],
}

export default config
