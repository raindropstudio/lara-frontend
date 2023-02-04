// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootId: '__lara',
  },
  typescript: {
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Noto+Sans+KR': {
        wght: [300, 400, 500, 700, 900],
      },
    },
    base64: false,
  },
})
