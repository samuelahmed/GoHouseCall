import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxHeight: {
        "5vh": "5vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "75vh": "75vh",
        "78vh": "78vh",
        "80vh": "80vh",
        "85vh": "85vh",
        "90vh": "90vh",
        "95vh": "95vh",
        "98vh": "98vh",
        "100vh": "100vh",
      },
      minHeight: {
        "5vh": "5vh",
        "20vh": "20vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "65vh": "65vh",
        "70vh": "70vh",
        "78vh": "78vh",
        "85vh": "85vh",
        "80vh": "80vh",
        "88vh": "88vh",
        "90vh": "90vh",
        "95vh": "95vh",
        "100vh": "100vh",
      },
      maxWidth: {
        "5vw": "5vw",
        "30vw": "30vw",
        "40vw": "40vw",
      },
      minWidth: {
        "40vw": "40vw",
        "30vw": "30vw",
      },
      colors: {
        blue1: "#fbfdff",
        blue2: "#f5faff",
        blue3: "#edf6ff",
        blue4: "#e1f0ff",
        blue5: "#cee7fe",
        blue6: "#b7d9f8",
        blue7: "#96c7f2",
        blue8: "#5eb0ef",
        blue9: "#0091ff",
        blue10: "#0081f1",
        blue11: "#006adc",
        blue12: "#00254d",
        //Dark Blue
        darkBlue1: "#0f1720",
        darkBlue2: "#0f1b2d",
        darkBlue3: "#10243e",
        darkBlue4: "#102a4c",
        darkBlue5: "#0f3058",
        darkBlue6: "#0d3868",
        darkBlue7: "#0a4481",
        darkBlue8: "#0954a5",
        darkBlue9: "#0091ff",
        darkBlue10: "#369eff",
        darkBlue12: "#eaf6ff",
        //Olive
        olive1: "#fcfdfc",
        olive2: "#f8faf8",
        olive10: "#818780",
        olive11: "#6b716a",
        olive12: "#141e12",
        // Dark Olive
        darkOlive2: " #1a1d19",
        darkOlive10: "#778175",
        darkOlive12: "#eceeec",
        //Slate
        slate12: "#11181c",
        //Yellow
        yellow9: "#f5d90a",
        //Red
        red5: "#fdd8d8",
        red11: "#c30007d4",
        //White & Black
        white: "#ffffff",
        black: "#000000",
        darkBg: "#121212",
        //Gray
        gray3: "#f3f3f3",
        gray4: "#ededed",
        darkGray3: "#232323",
        darkGray4: "#282828",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // roboto: ["Roboto", "sans-serif"],
        // robotoSlab: ["Roboto Slab", "serif"],
      },
      keyframes: {
        "accordion-down": {
          // from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          // to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
