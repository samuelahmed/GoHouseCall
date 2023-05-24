import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      //Colors from: https://www.radix-ui.com/docs/colors/palette-composition/the-scales
      //Blue
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
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
