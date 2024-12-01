// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    '@formkit/auto-animate/nuxt',
    '@nuxt/scripts',
  ],

  $production: {
    scripts: {
      registry: {
        clarity: {
          id: 'p72fcmul7c',
        },
        googleTagManager: {
          id: 'G-C00XKTBGWY',
        },
      },
    },
  },
  imports: {
    dirs: ['types/*.ts'],
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

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
        { name: 'og:image', property: 'og:image', content: '/og.png' },
        {
          hid: 'description',
          name: 'description',
          content: '메이플스토리 종합 데이터분석 서비스 라라모에', // TODO: 메타태그 설정
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: [
    'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.lara.moe',
    },
  },

  build: {
    transpile: ['hangul-typing-animation'],
  },
  devServer: {
    port: 3001,
  },
  future: {
    compatibilityVersion: 4, // Nuxt 4 대비해서 미리 활성화
  },
  compatibilityDate: '2024-08-10',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  headlessui: {
    prefix: 'H',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
