/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
  safelist: [
    'text-blue-500',
    'text-yellow-500',
    'text-orange-500',
    'text-red-500',
    'border-blue-500',
    'border-yellow-500',
    'border-orange-500',
    'border-red-500',
    'ring-blue-500',
    'ring-yellow-500',
    'ring-orange-500',
    'ring-red-500',
  ],
};