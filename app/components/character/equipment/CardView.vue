<template>
  <div>
    <div
      class="grid grid-cols-3 gap-3"
    >
      <template
        v-for="(item, idx) in mappedPreset"
        :key="idx"
      >
        <UiItemTooltip
          :item="item"
        >
          <div
            class="flex h-11 items-center justify-start rounded bg-gray-50 py-1 pr-2 outline outline-gray-300 drop-shadow-sm hover:bg-gray-100"
          >
            <div class="flex w-12 items-center justify-center">
              <img
                :src="getItemImageUrl(item.icon)"
                :alt="item.name"
                class="drop-shadow-md [image-rendering:_pixelated]"
              >
            </div>
            <div class="flex flex-col gap-0.5 text-xs font-light text-lucidgray-dark">
              <div class="flex flex-col">
                <div
                  v-if="item.starforce || getAddOptionGrade(item)"
                  class="line-clamp-1"
                >
                  {{ item.starforce ? item.starforce + '성' : '' }}
                  {{ item.starforce && getAddOptionGrade(item) ? ' | ' : '' }}
                  {{ getAddOptionGrade(item) }}
                  {{ (item.starforce || getAddOptionGrade(item)) && getUpgrade(item) ? ' | ' : '' }}
                  {{ getUpgrade(item) }}
                </div>
                <div
                  v-else
                  class="line-clamp-1"
                >
                  {{ item.name }}
                </div>
              </div>
              <div
                class="flex flex-nowrap items-center justify-start gap-1"
              >
                <template
                  v-for="(content, pidx) in getPotentialLine(item)"
                  :key="pidx"
                >
                  <div class="flex items-center gap-[3px] font-normal text-lucidgray-dark">
                    <div
                      class="h-3 w-1 rounded-full"
                      :class="getPotentialColor(content.color)"
                    />
                    <div class="line-clamp-1">
                      {{ content.text }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </UiItemTooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  viewPreset: ItemEquipmentInfo[] | undefined
  mainStatName: string
  atkStat: string
}>()

const { viewPreset, mainStatName, atkStat } = toRefs(props)

const cardViewMap = [
  '무기', '보조무기', '엠블렘',
  '모자', '상의', '하의',
  '장갑', '신발', '망토',
  '어깨장식', '벨트', '귀고리',
  '얼굴장식', '눈장식', '펜던트2',
  '펜던트', '반지4', '반지3',
  '반지2', '반지1', '기계 심장',
  '포켓 아이템', '뱃지', '훈장',
  '칭호',
]

const mappedPreset = computed(() => {
  return cardViewMap
    .map(slot => viewPreset.value?.find(equip => equip.slot === slot))
    .filter(equip => !!equip)
})

// 무기추옵
const getWeaponAddOption = (item: ItemEquipmentInfo) => {
  if (!item.baseOption || !item.addOption) return null
  const baseAtkOption = atkStat.value === '마력' ? item.baseOption.magicPower : item.baseOption.attackPower
  const atkOption = atkStat.value === '마력' ? item.addOption.magicPower : item.addOption.attackPower
  if (!atkOption) return null
  let optionText = ''

  // [순수공마/100 * (렙제/40 몫 + 1) * 추옵단계 * 1.1^(추옵단계-3)] 소수점 올림
  for (const grade of [7, 6, 5, 4, 3]) {
    const calcOption = Math.ceil((baseAtkOption ?? 0) / 100
      * (Math.floor((item.baseOption?.baseEquipmentLevel ?? 0) / 40) + 1)
      * grade * Math.pow(1.1, grade - 3))
    if (calcOption === atkOption) {
      optionText = 8 - grade + '추'
      break
    }
  }

  if (optionText) optionText += ' + '
  if (item.addOption.bossDamage) optionText += '보'
  if (item.addOption.damage) optionText += '뎀'
  if (item.addOption.allStat) optionText += '올'
  if (optionText.endsWith('보')) optionText += '공'

  return optionText
}

// 추옵
const getAddOptionGrade = (item: ItemEquipmentInfo) => {
  if (item.slot === '무기') return getWeaponAddOption(item)
  const addOption = item.addOption
  const mainStat = mainStatName.value?.toLowerCase() as 'str' | 'dex' | 'int' | 'luk'
  if (!addOption || !mainStat) return null
  const mainOption = addOption[mainStat] ?? 0
  const allStatOption = addOption.allStat ?? 0
  const atkOption = atkStat.value === '마력' ? addOption.magicPower || 0 : addOption.attackPower || 0

  if (mainOption === 0 && allStatOption === 0 && atkOption === 0) return null
  return mainOption + allStatOption * 10 + atkOption * 4 + '급'
}

// 작
const getUpgrade = (item: ItemEquipmentInfo) => {
  if (!item.etcOption) return null
  const count = item.scrollUpgrade ?? 0
  if (count === 0) return null
  const mainStat = mainStatName.value?.toLowerCase() as 'str' | 'dex' | 'int' | 'luk'
  const mainStatUpgrade = (item.etcOption[mainStat] ?? 0) / count
  const mainAtkUpgrade = ((atkStat.value === '마력' ? item.etcOption.magicPower : item.etcOption.attackPower) ?? 0) / count
  const upgradable = !!item.scrollResilienceCount || !!item.scrollUpgradeableCount

  // TODO: 작추정

  return Math.round(mainStatUpgrade * 10) / 10
    + '/'
    + Math.round(mainAtkUpgrade * 10) / 10
    + '작'
    + (upgradable ? '*' : '')
}

const getPotentialColor = (grade: string) => {
  if (grade === 'EXCEPTIONAL') return 'bg-potential-exceptional'
  if (grade === 'LEGENDARY') return 'bg-potential-legendary'
  if (grade === 'UNIQUE') return 'bg-potential-unique'
  if (grade === 'EPIC') return 'bg-potential-epic'
  if (grade === 'RARE') return 'bg-potential-rare'
  return 'bg-potential-normal'
}

const getPotentialText = (item: ItemEquipmentInfo, pot: boolean) => {
  const potential = pot ? item.potentialOption : item.additionalPotentialOption
  if (!potential) return ''

  // 무보엠
  if (item.slot === '무기' || item.slot === '보조무기' || item.slot === '엠블렘') {
    const res = potential.reduce((acc, pot) => {
      if (!pot) return acc
      acc.boss += parsePotential(pot, '보스 몬스터', '%')
      acc.ignoreDef += parsePotential(pot, '몬스터 방어율', '%')
      acc.atkp += parsePotential(pot, atkStat.value, '%')
      acc.stat += parsePotential(pot, mainStatName.value, '%')
      acc.allStat += parsePotential(pot, '올스탯', '%')
      return acc
    }, { boss: 0, ignoreDef: 0, atkp: 0, stat: 0, allStat: 0 })

    const text = []
    if (res.atkp && !pot) text.push(atkStat.value.slice(0, 1) + res.atkp)
    if (res.boss) text.push('보' + res.boss)
    if (res.ignoreDef) text.push('방' + res.ignoreDef)
    if (res.atkp && pot) text.push(atkStat.value.slice(0, 1) + res.atkp)
    if (res.stat) text.push('인' + res.stat)
    if (res.allStat) text.push('올' + res.allStat + '%')
    return text.join('⋅')
  }

  // 일반템
  const res = potential.reduce((acc, pot) => {
    if (!pot) return acc

    acc.item += parsePotential(pot, '아이템 드롭률', '%')
    acc.meso += parsePotential(pot, '메소', '%')
    acc.crit += parsePotential(pot, '크리티컬 데미지', '%')
    acc.levelStat += parsePotential(pot, '캐릭터 기준 9레벨 당')
    acc.stat += parsePotential(pot, mainStatName.value, '%')
    const allPot = parsePotential(pot, '올스탯', '%')
    acc.stat += allPot
    acc.atk += parsePotential(pot, atkStat.value)

    if (allPot) acc.hasAllStat = true
    return acc
  }, { item: 0, meso: 0, crit: 0, levelStat: 0, stat: 0, hasAllStat: false, atk: 0 })

  const text = []
  if (res.item) text.push('드' + res.item)
  if (res.meso) text.push('메' + res.meso)
  if (res.crit) text.push('크' + res.crit)
  if (res.levelStat) text.push('9렙' + res.levelStat)
  if (res.stat) text.push(res.stat + '%')
  if (res.atk) text.push(atkStat.value.slice(0, 1) + res.atk)

  if (text.length === 0) return '-'
  return text.join('⋅') + (res.hasAllStat ? '⁺' : '')
}

const getPotentialLine = (item: ItemEquipmentInfo) => {
  const contents = []

  if (item.potentialOptionGrade) {
    contents.push({
      color: item.potentialOptionGrade,
      text: getPotentialText(item, true),
    })
  }
  if (item.additionalPotentialOptionGrade) {
    contents.push({
      color: item.additionalPotentialOptionGrade,
      text: getPotentialText(item, false),
    })
  }
  if (item.exceptionalOption?.exceptionalUpgrade) {
    contents.push({
      color: 'EXCEPTIONAL',
      text: `+${item.exceptionalOption.exceptionalUpgrade}`,
    })
  }
  if (!item.potentialOptionGrade && !item.additionalPotentialOptionGrade && !item.exceptionalOption?.exceptionalUpgrade) {
    contents.push({
      color: 'NORMAL',
      text: item.specialRingLevel ? `Lv. ${item.specialRingLevel}` : '',
    })
  }

  return contents
}
</script>
