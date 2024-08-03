// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3001,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  future: {
    compatibilityVersion: 4, // Nuxt 4 대비해서 미리 활성화
  },

  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: [
    'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
  ],
  app: {
    head: {
      title: 'lara.moe',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#FFB944' },
        { name: 'og:type', property: 'og:type', content: 'website' },
        { name: 'og:site_name', property: 'og:site_name', content: 'lara.moe' },
        { name: 'og:title', property: 'og:title', content: 'lara.moe' },
        {
          hid: 'description',
          name: 'description',
          content: '라라는 개똑똑한거시에양', // TODO: 메타태그 설정, 파비콘 및 OG이미지 설정
        },
      ],
    },
  },
})
