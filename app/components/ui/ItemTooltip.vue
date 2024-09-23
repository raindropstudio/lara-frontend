<template>
  <div
    class="relative inline-block"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <div
      v-if="visible && item"
      class="pointer-events-none absolute left-full top-0 z-30 ml-2 overflow-visible whitespace-pre rounded-md bg-white px-2 py-1 text-sm font-light text-lucidviolet-900 ring-1 ring-lucidgray-light"
    >
      <div>
        {{ item.starforce }}
      </div>
      <div>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  item: ItemEquipmentInfo | undefined
}>()

const { item } = toRefs(props)

const visible = ref(false)
</script>
