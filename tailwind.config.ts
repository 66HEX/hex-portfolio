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
        hexblack: '#181818',
        hexwhite: '#E4E4DF',
        hexgreen1: '#043D5D',
        hexgreen2: '#032E46',
        hexgreen3: '#23B684',
        hexgreen4: '#0F595E',
      },
      fontFamily: {
        NeueMontreal: 'NeueMontreal',
        SupplyMono: 'SupplyMono'
      },
      fontSize: {
        '12xl': '10rem',
        '15xl': '15rem',
        '20xl': '20rem',
      },
      backgroundImage: {
        'vignette': 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
