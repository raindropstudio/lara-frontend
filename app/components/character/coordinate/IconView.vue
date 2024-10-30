<template>
  <div>
    <div
      class="grid grid-cols-7 gap-4"
    >
      <template
        v-for="(item, idx) in mappedPreset"
        :key="idx"
      >
        <UiItemTooltip
          :item="item"
        >
          <div
            v-if="iconViewMap[idx]"
            class="relative z-0 flex size-12 items-center justify-center rounded-lg bg-gray-50 drop-shadow-md transition-all duration-700 ease-in-out hover:bg-gray-100"
            :class="[
              getSlotColor(item),
              itemChanged[idx] ? '' : 'ring-2',
            ]"
          >
            <img
              v-if="item"
              :src="getItemImageUrl(item.icon)"
              :alt="item.name"
              class="drop-shadow-md transition-all duration-300 ease-in-out [image-rendering:_pixelated]"
            >
            <div
              v-if="item?.dateOptionExpire === '1998-12-31T15:00:00.000Z'"
              class="absolute bottom-0 right-0"
            >
              <IconWarn class="size-4 text-potential-expired" />
            </div>
          </div>
          <div
            v-else
            class="size-12"
          />
        </UiItemTooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  viewPreset: CashEquipmentInfo[] | undefined
  iconViewMap: string[]
}>()

const { viewPreset, iconViewMap } = toRefs(props)

const mappedPreset = computed(() => {
  return iconViewMap.value
    .map(slot => viewPreset.value?.find(equip => equip.slot === slot))
})

// 아이템 부드럽게 변경
const itemChanged = ref(new Array(iconViewMap.value.length).fill(false))
watch(
  () => mappedPreset.value,
  (newPreset, oldPreset) => {
    newPreset.forEach((item, idx) => {
      if (item?.icon !== oldPreset[idx]?.icon) {
        itemChanged.value[idx] = true
        setTimeout(() => {
          itemChanged.value[idx] = false
        }, 300)
      }
    })
  },
)

const getSlotColor = (item?: CashEquipmentInfo) => {
  if (!item) return 'ring-lucidgray-light'
  if (!viewPreset?.value) return 'ring-potential-normal'

  return 'ring-potential-normal'
}
</script>
