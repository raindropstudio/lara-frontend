const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'sunny-orange': '#FFB944',
        'lucid-violet': '#706A98',
        'violet-gray': '#7E7F99',
        'background-violet': '#FAFAFF',
      }
    }
  }
}
