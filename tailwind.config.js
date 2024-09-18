const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '30px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
