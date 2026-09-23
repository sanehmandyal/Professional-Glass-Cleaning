/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#06111C',
          900: '#0B1F33',
          800: '#102033',
          700: '#1A334E',
          600: '#264A6E',
        },
        brand: {
          50: '#EAF6FF',
          100: '#D5EDFF',
          200: '#ADD8FF',
          300: '#7AC0FF',
          400: '#38BDF8',
          500: '#1677FF',
          600: '#0958D9',
          700: '#003EB3',
          800: '#002C8C',
          900: '#001D66',
        },
        cyan: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F5F8FC',
          200: '#EAF1F8',
          300: '#DDE7F2',
        },
        dark: '#102033',
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(11, 31, 51, 0.08)',
        'glass-hover': '0 16px 40px 0 rgba(22, 119, 255, 0.14)',
        'glass-lg': '0 24px 64px -12px rgba(11, 31, 51, 0.12)',
        'glass-glow': '0 0 25px rgba(56, 189, 248, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(56, 189, 248, 0.15), rgba(234, 246, 255, 0.7) 40%, rgba(255, 255, 255, 0.95) 75%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.45) 100%)',
        'glass-card-dark': 'linear-gradient(135deg, rgba(11, 31, 51, 0.85) 0%, rgba(16, 32, 51, 0.95) 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1677FF 0%, #38BDF8 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        float: 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
