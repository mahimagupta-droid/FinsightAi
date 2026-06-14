import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base system colors
        background: "var(--background)",
        textColor: "var(--textColor)",

        card: {
          DEFAULT: "var(--card)",
          textColor: "var(--card-textColor)",
        },

        primary: {
          DEFAULT: "var(--primary)",
          textColor: "var(--primary-textColor)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          textColor: "var(--secondary-textColor)",
        },

        muted: {
          DEFAULT: "var(--muted)",
          textColor: "var(--muted-textColor)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          textColor: "var(--accent-textColor)",
        },

        // Semantic colors
        success: {
          DEFAULT: "var(--success)",
          textColor: "var(--success-textColor)",
        },

        warning: {
          DEFAULT: "var(--warning)",
          textColor: "var(--warning-textColor)",
        },

        danger: {
          DEFAULT: "var(--danger)",
          textColor: "var(--danger-textColor)",
        },

        info: {
          DEFAULT: "var(--info)",
          textColor: "var(--info-textColor)",
        },

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        lato: "var(--font-lato)",
        lexend: "var(--font-lexend)",
        playfair: "var(--font-playfair)",
      },
      // Custom animations (optional)
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
