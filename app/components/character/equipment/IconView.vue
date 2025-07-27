<template>
  <div>
    <div
      class="grid grid-cols-5 gap-4"
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
            class="relative z-0 flex size-12 items-center justify-center rounded bg-gray-50 drop-shadow-md transition-all duration-700 ease-in-out hover:bg-gray-100"
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
  viewPreset: ItemEquipmentInfo[] | undefined
}>()

const { viewPreset } = toRefs(props)

const iconViewMap = [
  '반지4', '얼굴장식', '', '모자', '망토',
  '반지3', '눈장식', '무기', '상의', '장갑',
  '반지2', '귀고리', '보조무기', '하의', '신발',
  '반지1', '펜던트2', '엠블렘', '어깨장식', '훈장',
  '벨트', '펜던트', '', '', '기계 심장',
  '포켓 아이템', '', '', '칭호', '뱃지',
]

const mappedPreset = computed(() => {
  return iconViewMap
    .map(slot => viewPreset.value?.find(equip => equip.slot === slot))
})

// 아이템 부드럽게 변경
const itemChanged = ref(new Array(iconViewMap.length).fill(false))
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

const getSlotColor = (item?: ItemEquipmentInfo) => {
  if (!viewPreset?.value) return 'ring-potential-normal'
  if (!item) return 'ring-lucidgray-light'

  const grade = item?.potentialOptionGrade
  const addiGrade = item?.additionalPotentialOptionGrade

  if (item.exceptionalOption?.exceptionalUpgrade) return 'ring-potential-exceptional'
  if (grade === 'LEGENDARY' || addiGrade === 'LEGENDARY') return 'ring-potential-legendary'
  if (grade === 'UNIQUE' || addiGrade === 'UNIQUE') return 'ring-potential-unique'
  if (grade === 'EPIC' || addiGrade === 'EPIC') return 'ring-potential-epic'
  if (grade === 'RARE' || addiGrade === 'RARE') return 'ring-potential-rare'
  if (item.dateOptionExpire === '1998-12-31T15:00:00.000Z') return 'ring-potential-expired'
  return 'ring-potential-normal'
}
</script>
