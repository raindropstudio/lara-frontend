<template>
  <div
    class="relative inline-block"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <HTransitionRoot
      enter="transition-opacity duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div
        v-if="visible"
        class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1 -translate-x-1/2 rounded-md bg-lucid-light px-2 py-1 text-sm font-light text-lucidviolet-900 shadow-lg shadow-lucidviolet-800"
      >
        <slot name="tooltip" />
      </div>
    </HTransitionRoot>
  </div>
</template>

<script lang="ts" setup>
const visible = ref(false)
</script>
