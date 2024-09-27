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
  const mainStat = mainStatName.value?.toLowerCase() as 'str' | 'dex' | 'int' | 'luk' | 'hp' | 'mix'
  if (!addOption || !mainStat) return null

  if (mainStat === 'hp') {
    const hpOption = addOption.maxHp ?? 0
    const atkOption = addOption.attackPower ?? 0
    const reqLevel = item.baseOption?.baseEquipmentLevel ?? 0

    for (const grade of [1, 2, 3, 4, 5]) {
      const calcOption = Math.floor(reqLevel / 10) * 10 * (8 - grade) * 3
      if (calcOption === hpOption) {
        return grade + '추' + (atkOption ? ' + ' + '공' + atkOption : '')
      }
    }
    return atkOption ? '공' + atkOption : null
  }

  if (mainStat === 'mix') {
    const allStatOption = addOption.allStat ?? 0
    const strOption = addOption.str ?? 0
    const dexOption = addOption.dex ?? 0
    const lukOption = addOption.luk ?? 0
    const atkOption = addOption.attackPower ?? 0

    const res = ((strOption + dexOption + lukOption + allStatOption * 20 + atkOption * 6) / 2)
    if (res === 0) return null
    return res.toFixed(0) + '급'
  }

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
  const mainStat = mainStatName.value?.toLowerCase() as 'str' | 'dex' | 'int' | 'luk' | 'hp'

  let mainStatUpgrade = 0
  if (mainStat === 'hp') mainStatUpgrade = (item.etcOption.maxHp ?? 0) / count
  else mainStatUpgrade = (item.etcOption[mainStat] ?? 0) / count

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
  if (grade === 'EXPIRED') return 'bg-potential-expired'
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

      acc.hp += parsePotential(pot, '최대 HP', '%')
      acc.str += parsePotential(pot, 'STR', '%')
      acc.dex += parsePotential(pot, 'DEX', '%')
      acc.int += parsePotential(pot, 'INT', '%')
      acc.luk += parsePotential(pot, 'LUK', '%')
      acc.allStat += parsePotential(pot, '올스탯', '%')
      return acc
    }, { boss: 0, ignoreDef: 0, atkp: 0, str: 0, dex: 0, int: 0, luk: 0, hp: 0, allStat: 0 })

    const text = []
    if (res.atkp && !pot) text.push(atkStat.value.slice(0, 1) + res.atkp)
    if (res.boss) text.push('보' + res.boss)
    if (res.ignoreDef) text.push('방' + res.ignoreDef)
    if (res.atkp && pot) text.push(atkStat.value.slice(0, 1) + res.atkp)

    if (mainStatName.value === 'HP' && res.hp) text.push('HP' + res.hp)
    if ((mainStatName.value === 'STR' || mainStatName.value === 'MIX') && res.str) text.push('힘' + res.str)
    if ((mainStatName.value === 'DEX' || mainStatName.value === 'MIX') && res.dex) text.push('덱' + res.dex)
    if (mainStatName.value === 'INT' && res.int) text.push('인' + res.int)
    if ((mainStatName.value === 'LUK' || mainStatName.value === 'MIX') && res.luk) text.push('럭' + res.luk)
    if (res.allStat) text.push('올' + res.allStat)

    if (text.length === 0) return '-'
    return text.join('⋅')
  }

  // 일반템
  const res = potential.reduce((acc, pot) => {
    if (!pot) return acc

    acc.item += parsePotential(pot, '아이템 드롭률', '%')
    acc.meso += parsePotential(pot, '메소', '%')
    acc.critical += parsePotential(pot, '크리티컬 데미지', '%')
    acc.levelStat += parsePotential(pot, '캐릭터 기준 9레벨 당')

    acc.hp += parsePotential(pot, '최대 HP', '%')
    acc.str += parsePotential(pot, 'STR', '%')
    acc.dex += parsePotential(pot, 'DEX', '%')
    acc.int += parsePotential(pot, 'INT', '%')
    acc.luk += parsePotential(pot, 'LUK', '%')
    acc.allStat += parsePotential(pot, '올스탯', '%')

    acc.atk += parsePotential(pot, atkStat.value)
    return acc
  }, { item: 0, meso: 0, critical: 0, levelStat: 0, str: 0, dex: 0, int: 0, luk: 0, hp: 0, allStat: 0, atk: 0 })

  const text = []
  if (res.item) text.push('드' + res.item)
  if (res.meso) text.push('메' + res.meso)
  if (res.critical) text.push('크' + res.critical)

  if (mainStatName.value === 'HP' && res.hp) text.push(res.hp + '%')
  else if (mainStatName.value === 'MIX') {
    if (res.allStat) text.push(res.allStat + '%')
    if (res.levelStat) text.push('9렙' + res.levelStat)
    if (res.str) text.push('힘' + res.str)
    if (res.dex) text.push('덱' + res.dex)
    if (res.luk) text.push('럭' + res.luk)
  }
  else {
    if (res.levelStat) text.push('9렙' + res.levelStat)
    if (res[mainStatName.value.toLowerCase() as 'str' | 'dex' | 'int' | 'luk']) {
      text.push(
        res[mainStatName.value.toLowerCase() as 'str' | 'dex' | 'int' | 'luk']
        + res.allStat
        + '%')
    }
  }

  if (res.atk) text.push(atkStat.value.slice(0, 1) + res.atk)

  if (text.length === 0) return '-'
  return text.join('⋅') + (res.allStat && mainStatName.value !== 'HP' && mainStatName.value !== 'MIX' ? '⁺' : '')
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = String(date.getFullYear()).slice(-2) // 연도의 뒤 두 자리만 가져오기
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1 더하기
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
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
    if (item.specialRingLevel) {
      contents.push({
        color: 'NORMAL',
        text: `Lv. ${item.specialRingLevel}`,
      })
    }
    else if (item.dateOptionExpire) {
      const isExpired = item.dateOptionExpire === '1998-12-31T15:00:00.000Z'

      // 초단위 제거
      contents.push({
        color: isExpired ? 'EXPIRED' : 'NORMAL',
        text: isExpired ? '옵션 기간 만료' : formatDate(item.dateOptionExpire) + ' 만료',
      })
    }
    else if (item.dateExpire) {
      contents.push({
        color: 'NORMAL',
        text: formatDate(item.dateExpire) + ' 까지',
      })
    }
    else {
      contents.push({
        color: 'NORMAL',
        text: '-',
      })
    }
  }

  return contents
}
</script>
