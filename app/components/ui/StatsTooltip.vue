<template>
  <div
    ref="popupRef"
    class="relative inline-block"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <div
      v-if="visible"
      ref="popupFloating"
      :style="floatingStyles"
      class="pointer-events-none absolute left-0 top-0 z-30 flex rounded-md bg-white/50 p-2 text-xs font-light text-lucidviolet-900 ring-2 ring-lucidgray-light backdrop-blur-2xl"
      style="white-space: nowrap;"
    >
      <slot name="tooltip" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { autoUpdate, limitShift, offset, shift, useFloating } from '@floating-ui/vue'
import { ref } from 'vue'

const visible = ref(false)
const popupRef = ref<HTMLElement | null>(null)
const popupFloating = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(popupRef, popupFloating, {
  whileElementsMounted: autoUpdate,
  placement: 'top',
  middleware: [
    offset(10),
    shift({
      crossAxis: true,
      limiter: limitShift(),
    }),
  ],
})
</script>
