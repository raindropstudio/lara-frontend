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
    </div>
    <button
      class="ms-6 flex items-center justify-center rounded-full px-2 font-extralight hover:bg-lucidviolet-50"
      :disabled="updateStatus === 'pending'"
      :class="[
        updateStatus === 'pending' ? 'cursor-wait text-lucidviolet-400' : 'cursor-pointer',
        updateStatus === 'error' ? 'text-red-500' : 'text-lucidviolet-500',
      ]"
      @click="$emit('refresh')"
    >
      <div class="size-4">
        <IconRefresh
          v-if="updateStatus !== 'pending'"
        />
        <IconSpinner
          v-if="updateStatus === 'pending'"
        />
      </div>
      <HTransitionRoot
        :show="updateStatus !== 'pending'"
        enter="transition-all duration-300 ease-in-out"
        enter-from="opacity-0 w-0"
        enter-to="opacity-100 w-14"
        leave="transition-all duration-300 ease-in-out"
        leave-from="opacity-100 w-14"
        leave-to="opacity-0 w-0"
      >
        <span class="inline-block w-14 text-right">
          {{ duration === '0분' ? '방금 전' : duration + ' 전' }}
        </span>
      </HTransitionRoot>
    </button>
  </div>
</template>

<script lang="ts" setup>
import humanizeDuration from 'humanize-duration'

const props = defineProps<{
  characterImageUrl: string | undefined
  showImage: boolean
  updatedAt: string | undefined
  updateStatus: string
}>()
defineEmits <{
  refresh: []
}>()
const { characterImageUrl, showImage, updatedAt, updateStatus } = toRefs(props)
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
  if (!updatedAt.value) return ''
  return humanizeDuration(Date.now() - new Date(updatedAt.value).getTime(), {
    language: 'ko',
    largest: 1,
    round: true,
    units: ['y', 'mo', 'd', 'h', 'm'],
    spacer: '',
  })
})
</script>
