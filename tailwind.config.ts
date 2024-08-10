import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        sunnyorange: '#FFB944',
        lucidviolet: {
          50: '#f4f5f9',
          100: '#ebedf4',
          200: '#dadceb',
          300: '#c3c7de',
          400: '#aaabcf',
          500: '#9594c0',
          600: '#827caf',
          700: '#706a98', // primary
          800: '#5c577c',
          900: '#4c4a65',
          950: '#2d2b3b',
        },
        lucid: {
          50: '#fafaff', // lucidLight
          900: '#1C2129', // lucidDark // TODO: 색 선정하기
        },
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          '"Pretendard"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
}
