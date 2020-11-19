module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Roboto Mono', 'Menlo', 'monospace'],
      body: ['Roboto Mono', 'Menlo', 'monospace'],
    },
    extend: {
      colors: {
        laure: '#8057E3',
        'laure-100': '#f7f0ff',
        'laure-200': '#f6f0ff',
        'laure-300': '#eadbff',
        'laure-400': '#ccb1fc',
        'laure-500': '#a681f0',
        'laure-600': '#8057e3',
        'laure-700': '#603ebd',
        'laure-800': '#432a96',
        'laure-900': '#2b1a70',
        'laure-1000': '#1a104a'
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'main-app': '200px auto'
      },
      width: {
        '72': '18rem',
        '80': '20rem',
      }
    }
  },
  variants: {},
  plugins: []
}
