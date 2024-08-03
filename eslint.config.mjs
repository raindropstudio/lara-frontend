import tailwind from 'eslint-plugin-tailwindcss'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  tailwind.configs['flat/recommended'],
)
