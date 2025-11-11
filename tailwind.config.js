/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      'primary': '#8c0096ff',
      'secondary': '#FFC107',
      'accent': '#FF5722',
      'dark': '#212121',
      'light': '#FFFFFF',
      'error': '#F44336',
      'success': '#4CAF50',
      'warning': '#FF9800',
    }
  },
  plugins: [],
}
