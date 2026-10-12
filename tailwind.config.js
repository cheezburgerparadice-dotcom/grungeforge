/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0d',
        panel: '#15171d',
        ember: '#ff5a36',
        smoke: '#b7b7bf',
        haze: '#1f232d',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,90,54,0.4), 0 12px 30px rgba(255,90,54,0.25)',
      },
    },
  },
  plugins: [],
};
