/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2874f0', // Flipkart Blue
        secondary: '#fb641b', // Flipkart Orange
        fk_blue: '#2874f0',
        fk_yellow: '#ffe11b',
        color_bg_yellow: '#ffe11b',
        bgLight: '#f1f2f4',
        bgWhite: '#ffffff'
      },
 backgroundImage: {
  bgGradient: 'linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)',
  bgGradientLight: 'linear-gradient(90deg, #bbdefb 0%, #ffffff 100%)',
}

      boxShadow: {
        fk_shadow: '0 1px 2px 0 rgba(0,0,0,0.16)',
        premium: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        custom: '0 2px 8px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};