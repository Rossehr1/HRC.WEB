import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B1A17",
        paper: "#F7F2E8",
        sand: "#EFE4D2",
        oxblood: "#7A2E1D",
        brass: "#B08D57",
        slate: "#3B4A5A"
      }
    }
  },
  plugins: []
} satisfies Config;
