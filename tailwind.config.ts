/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Nunito', 'sans-serif'],
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
          'fadeUp': {
            'from': {
              opacity: '0',
              transform: 'translateY(30px)',
            },
            'to': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          'fadeIn': {
            'from': { opacity: '0' },
            'to': { opacity: '1' },
          },
          'slideInLeft': {
            'from': {
              opacity: '0',
              transform: 'translateX(-40px)',
            },
            'to': {
              opacity: '1',
              transform: 'translateX(0)',
            },
          },
          'slideInRight': {
            'from': {
              opacity: '0',
              transform: 'translateX(40px)',
            },
            'to': {
              opacity: '1',
              transform: 'translateX(0)',
            },
          },
          'scaleIn': {
            'from': {
              opacity: '0',
              transform: 'scale(0.9)',
            },
            'to': {
              opacity: '1',
              transform: 'scale(1)',
            },
          },
          'revealLine': {
            'from': {
              width: '0',
              opacity: '0',
            },
            'to': {
              width: '100%',
              opacity: '1',
            },
          },
          'shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
          'floatSlow': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'kenBurns': {
            'from': { transform: 'scale(1.1)' },
            'to': { transform: 'scale(1)' },
          },
        },
        animation: {
          'marquee-left': 'marquee-left 30s linear infinite',
          'marquee-right': 'marquee-right 30s linear infinite',
          'fade-up': 'fadeUp 0.8s ease-out forwards',
          'fade-up-fast': 'fadeUp 0.6s ease-out forwards',
          'fade-up-slow': 'fadeUp 1s ease-out forwards',
          'fade-up-slower': 'fadeUp 1.2s ease-out forwards',
          'fade-in': 'fadeIn 0.8s ease-out forwards',
          'fade-in-fast': 'fadeIn 0.6s ease-out forwards',
          'fade-in-slow': 'fadeIn 1s ease-out forwards',
          'fade-in-slower': 'fadeIn 1.2s ease-out forwards',
          'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
          'slide-in-left-fast': 'slideInLeft 0.6s ease-out forwards',
          'slide-in-left-slow': 'slideInLeft 1s ease-out forwards',
          'slide-in-left-slower': 'slideInLeft 1.2s ease-out forwards',
          'slide-in-right': 'slideInRight 0.8s ease-out forwards',
          'slide-in-right-fast': 'slideInRight 0.6s ease-out forwards',
          'slide-in-right-slow': 'slideInRight 1s ease-out forwards',
          'slide-in-right-slower': 'slideInRight 1.2s ease-out forwards',
          'scale-in': 'scaleIn 0.8s ease-out forwards',
          'scale-in-fast': 'scaleIn 0.6s ease-out forwards',
          'scale-in-slow': 'scaleIn 1s ease-out forwards',
          'scale-in-slower': 'scaleIn 1.2s ease-out forwards',
          'reveal-line': 'revealLine 0.8s ease-out forwards',
          'reveal-line-fast': 'revealLine 0.6s ease-out forwards',
          'reveal-line-slow': 'revealLine 1s ease-out forwards',
          'reveal-line-slower': 'revealLine 1.2s ease-out forwards',
          'shimmer': 'shimmer 2s ease-in-out infinite',
          'float-slow': 'floatSlow 3s ease-in-out infinite',
          'ken-burns': 'kenBurns 8s ease-out forwards',
        },
      },
    },
    plugins: [],
  }