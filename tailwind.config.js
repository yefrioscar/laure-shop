module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        laure: '#8057E3',
        'laure-100': '#ded0fd',
        'laure-300': '#5933b1'
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'main-app': '200px auto'
      }
    }
  },
  variants: {},
  plugins: []
}
