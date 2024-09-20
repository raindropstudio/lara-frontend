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
                세트옵션세트옵션세트옵션
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="mb-4 text-5xl font-extrabold text-lucidgray-light">
              아이템 요약
            </div>
            <div class="mx-auto">
              <div class="grid grid-cols-3 items-center justify-center gap-6">
                <template
                  v-for="(value, idx) in itemSummary"
                  :key="idx"
                >
                  <div class="flex flex-col items-center justify-center">
                    <div class="text-xl font-light text-lucidgray-medium">
                      {{ value.name }}
                    </div>
                    <div class="text-3xl font-medium text-lucid-violetgray">
                      {{ value.value }}
                    </div>
                  </div>
                </template>
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
  const title = equipPreset?.[3]?.itemEquipmentInfo?.[0]
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

const itemSummary = computed(() => {
  const summary: {
    [key: string]: {
      name: string
      value: string
    } } = {
    starforce: { name: '스타포스', value: '-' },
    potential: { name: '잠재능력', value: '-' },
    additional: { name: '에디셔널', value: '-' },
    boss: { name: '보스공격력', value: '-' },
    atkp: { name: '공/마%', value: '-' },
    ignoreDef: { name: '방어력무시', value: '-' },
  }

  if (!viewPreset.value) return summary

  // 스타포스
  const starforce = viewPreset.value.reduce((acc, equip) => {
    if (!equip || equip.starforce === undefined) return acc
    if (equip.starforceScrollFlag) return acc // 놀장템 제외
    if (equip.slot === '무기' || equip.slot === '보조무기' || equip.slot === '엠블렘') return acc // 무기류 제외
    if (equip.slot === '기계 심장') return acc // 하트 제외
    if (equip.name.startsWith('헬리시움 정예 ')) return acc // 슈페리얼 제외
    if (equip.name.startsWith('노바 ')) return acc // 슈페리얼 제외
    if (equip.name.startsWith('타일런트 ')) return acc // 슈페리얼 제외
    return {
      sum: acc.sum + equip.starforce,
      count: acc.count + 1,
    }
  }, { sum: 0, count: 0 })
  summary.starforce = { name: '스타포스', value: (starforce.sum / starforce.count).toFixed(1) }

  const mainStatName = findMainStat(character.value)?.toUpperCase()
  const atkStat = mainStatName === 'INT' ? '마력' : '공격력'

  // 잠재, 에디
  if (mainStatName) {
    const statPer = viewPreset.value.reduce((acc, equip) => {
      if (!equip) return acc
      if (equip.slot === '무기' || equip.slot === '보조무기' || equip.slot === '엠블렘') return acc // 무기류 제외
      if (!equip.potentialOptionGrade && !equip.additionalPotentialOptionGrade) return acc // 잠재 없으면

      // 잠재
      const potential = equip.potentialOption
      const additional = equip.additionalPotentialOption

      // 모자, 장갑은 에디만 계산
      // 잠재: <주스탯> : +N% / 올스탯 : +N%
      if (equip.slot !== '모자' && equip.slot !== '장갑') {
        acc.potentialCount += 1
        potential?.forEach((pot) => {
          if (pot.startsWith('올스탯') && pot.endsWith('%')) {
            acc.potential += parseInt(pot.split('+')[1]?.split('%')[0] ?? '0') * 1.1
          }
          if (pot.startsWith(mainStatName) && pot.endsWith('%')) {
            acc.potential += parseInt(pot.split('+')[1]?.split('%')[0] ?? '0')
          }
        })
      }

      // 에디: <주스탯> : +N% / 올스탯 : +N% / <공/마> : +N / 캐릭터 기준 9레벨 당 <주스탯> : +N / <주스탯> : +N
      acc.additionalCount += 1
      additional?.forEach((add) => {
        if (add.startsWith('올스탯') && add.endsWith('%')) {
          acc.additional += parseInt(add.split('+')[1]?.split('%')[0] ?? '0') * 1.1
        }
        if (add.startsWith(mainStatName)) {
          if (add.endsWith('%')) acc.additional += parseInt(add.split('+')[1]?.split('%')[0] ?? '0')
          else acc.additional += parseInt(add.split('+')[1] ?? '0') * 0.13
        }
        if (add.startsWith(atkStat)) {
          acc.additional += parseInt(add.split('+')[1] ?? '0') * 0.32
        }
        if (add.startsWith('캐릭터 기준 9레벨 당')) {
          acc.additional += parseInt(add.split('+')[1] ?? '0') * 3.4
        }
      })

      return acc
    }, {
      potential: 0,
      additional: 0,
      potentialCount: 0,
      additionalCount: 0,
    })

    summary.potential = { name: '잠재 ' + mainStatName, value: (statPer.potential / statPer.potentialCount).toFixed(1) + '%' }
    summary.additional = { name: '에디 ' + mainStatName, value: (statPer.additional / statPer.additionalCount).toFixed(1) + '%' }
  }

  return summary
})
</script>
