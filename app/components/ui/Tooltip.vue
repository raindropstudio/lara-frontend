<template>
  <div
    class="relative inline-block"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <div
      v-if="visible"
      class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1 -translate-x-1/2 overflow-visible whitespace-pre rounded-md bg-white px-2 py-1 text-sm font-light text-lucidviolet-900 ring-1 ring-lucidgray-light"
    >
      <slot name="tooltip" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const visible = ref(false)
</script>
