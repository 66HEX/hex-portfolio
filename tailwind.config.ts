import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hexblack: '#1C1F23',
        hexwhite: '#F5F5F5',
        hexgreen1: '#022233',
        hexgreen2: '#032B41',
        hexgreen3: '#0C4446',
        hexgreen4: '#1A8E68',
      },
      fontFamily: {
        GeistSans: 'GeistSans',
        GeistMono: 'GeistMono'
      },
      fontSize: {
        '12xl': '10rem',
        '15xl': '15rem',
        '20xl': '20rem',
      }
    },
  },
  plugins: [],
};
export default config;
