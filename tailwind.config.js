module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        laure: '#8057E3'
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
