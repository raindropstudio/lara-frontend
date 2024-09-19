<template>
  <div>
    <div class="flex flex-col">
      <div class="text-8xl font-black text-lucidgray-light">
        Equipment
      </div>
      <div class="my-12 flex items-center justify-around">
        <div class="">
          <div class="grid grid-cols-5 gap-4">
            <template
              v-for="(slot, idx) in idxSlotMap"
              :key="idx"
            >
              <div
                v-if="slot"
                class="flex size-12 items-center justify-center rounded bg-gray-50 ring-2 drop-shadow-md"
                :class="getSlotColor(slot)"
              >
                <img
                  :src="getItemImageUrl(viewPreset?.find(equip => equip.slot === slot)?.icon)"
                  :alt="viewPreset?.find(equip => equip.slot === slot)?.name"
                  class="drop-shadow-md [image-rendering:_pixelated]"
                >
              </div>
              <div
                v-else
                class="size-12"
              />
            </template>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="mb-8 flex flex-col">
            <div class="mb-4 text-5xl font-extrabold text-lucidgray-light">
              세트 옵션
            </div>
            <div class="mx-auto">
              <div class="text-xl font-light text-lucidviolet-700">
                세트옵션을 찾지 못했어요.
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mb-4 text-5xl font-extrabold text-lucidgray-light">
              아이템 요약
            </div>
            <div class="mx-auto">
              <div class="text-xl font-light text-lucidviolet-700">
                아이템 정보를 가져오지 못했어요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  character: Character | undefined
}>()

const character = toRef(props, 'character')
const equipPreset = character.value?.itemEquipmentPreset
const activePresetIdx = equipPreset?.findIndex(equip => equip.active)
const viewPresetIdx = ref(activePresetIdx) // 기본값은 활성화 프리셋

const idxSlotMap = [
  '반지4', '', '모자', '', '엠블렘',
  '반지3', '펜던트2', '얼굴장식', '', '뱃지',
  '반지2', '펜던트', '눈장식', '귀고리', '훈장',
  '반지1', '무기', '상의', '어깨장식', '보조무기',
  '포켓 아이템', '벨트', '하의', '장갑', '망토',
  '칭호', '', '신발', '안드로이드', '기계 심장',
]

const viewPreset = computed(() => {
  // 백엔드 converter에서 프리셋 순서대로 보내주도록 보장함
  const preset = equipPreset?.[viewPresetIdx.value ?? 0]?.itemEquipmentInfo

  // 칭호
  const title = equipPreset?.[3]?.itemEquipmentInfo[0]
  if (title) preset?.push(title)

  // TODO: 안드로이드

  return preset
})

const getSlotColor = (slot: string) => {
  if (!viewPreset?.value) return 'ring-potential-normal'
  const item = viewPreset.value.find(equip => equip.slot === slot)
  if (!item) return 'ring-lucidgray-light'

  const grade = item?.potentialOptionGrade
  const additionalOption = item?.additionalPotentialOptionGrade

  if (item.exceptionalOption?.exceptionalUpgrade) return 'ring-potential-exceptional'
  if (grade === 'LEGENDARY' || additionalOption === 'LEGENDARY') return 'ring-potential-legendary'
  if (grade === 'UNIQUE' || additionalOption === 'UNIQUE') return 'ring-potential-unique'
  if (grade === 'EPIC' || additionalOption === 'EPIC') return 'ring-potential-epic'
  if (grade === 'RARE' || additionalOption === 'RARE') return 'ring-potential-rare'
  return 'ring-potential-normal'
}
</script>
