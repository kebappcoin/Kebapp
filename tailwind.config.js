/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F4F914',
          blue: '#19C5E2',
          DEFAULT: '#19C5E2',
        }
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(267deg, #F4F914 1.61%, #19C5E2 98.09%)',
      },
      boxShadow: {
        'gradient': '0 4px 20px rgba(244, 249, 20, 0.1)',
        'gradient-hover': '0 8px 30px rgba(25, 197, 226, 0.15)',
      }
    },
  },
  plugins: [],
};