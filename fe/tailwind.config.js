/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#1B73E8',
        darkModeShadow: '#ffffff',
      },
      transitionProperty: {
        colors: 'background-color', // 启用背景颜色过渡
      },
    },
  },
  plugins: [],
}
