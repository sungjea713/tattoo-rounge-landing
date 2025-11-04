/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode color palette
        'dark': {
          DEFAULT: '#000000',
          '50': '#0a0a0a',
          '100': '#111111',
          '200': '#1a1a1a',
          '300': '#1f1f1f',
          '400': '#2a2a2a',
          '500': '#333333',
        },
        'gray': {
          'light': '#e5e5e5',
          'medium': '#a0a0a0',
          'border': '#333333',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}
