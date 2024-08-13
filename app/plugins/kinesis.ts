import { kinesisPlugin } from '@letstri/kinesis'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(kinesisPlugin)
})
