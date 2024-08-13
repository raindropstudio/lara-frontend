<template>
  <div
    class="flex items-center justify-center text-nowrap rounded-full border border-lucidviolet-200 bg-white py-1 text-lucidviolet-700 transition-all duration-300 ease-in-out"
    :class="[
      showImage && isReady ? 'px-4' : 'px-8',
    ]"
  >
    <div
      class="flex items-center justify-center"
    >
      <HTransitionRoot
        :show="showImage && isReady"
        enter="transition-all duration-300 ease-in-out"
        enter-from="opacity-0 scale-0 size-0"
        enter-to="opacity-100 scale-100 size-6 mr-4"
        entered="size-6 mr-4"
        leave="transition-all duration-300 ease-in-out"
        leave-from="opacity-100 scale-100 size-6 mr-4"
        leave-to="opacity-0 scale-0 size-0"
      >
        <div
          class="size-6 overflow-hidden rounded-full border border-lucidviolet-200"
        >
          <img
            :src="characterImageUrl"
            alt="character avatar"
            class="size-12 -translate-y-1/4 -scale-x-100 object-cover"
            draggable="false"
          >
        </div>
      </HTransitionRoot>
    </div>
    <div class="flex items-center justify-center gap-8">
      <div>
        기본정보
      </div>
      <div>
        장비
      </div>
      <div>
        헥사
      </div>
      <div>
        스텟
      </div>
      <div
        class="font-extralight"
      >
        <span>{{ duration }} 전</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import humanizeDuration from 'humanize-duration'

const { updatedAt } = defineProps<{
  characterImageUrl: string | undefined
  showImage: boolean
  updatedAt: string | undefined
}>()
defineEmits <{
  refresh: []
}>()
const isReady = ref(false)

onMounted(() => {
  setTimeout(() => {
    isReady.value = true
  }, 300)
})

onActivated(() => {
  setTimeout(() => {
    isReady.value = true
  }, 300)
})

onDeactivated(() => {
  isReady.value = false
})

const duration = computed(() => {
  if (!updatedAt) return ''
  return humanizeDuration(Date.now() - new Date(updatedAt).getTime(), {
    language: 'ko',
    largest: 1,
    round: true,
    units: ['y', 'mo', 'd', 'h', 'm'],
    spacer: '',
  })
})
</script>
