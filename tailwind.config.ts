/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Poppins', 'sans-serif'],
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          hulma: {
            brown: '#766C62',
            taupe: '#BFB8AE',
            ghost: '#F5F4F0',
            green: '#3F443F',
            orange: '#B18D75',
            blue: '#B4C9CC',
          },
        },
        keyframes: {
          'marquee-left': {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          'marquee-right': {
            '0%': { transform: 'translateX(-50%)' },
            '100%': { transform: 'translateX(0%)' },
          },
        },
        animation: {
          'marquee-left': 'marquee-left 30s linear infinite',
          'marquee-right': 'marquee-right 30s linear infinite',
        },
      },
    },
    plugins: [],
  }
