import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        sunnyorange: '#FFB944',
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
