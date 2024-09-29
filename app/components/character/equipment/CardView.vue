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

  // TODO: 주흔작

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
  const parsed = parsePotentialList(potential)

  // 무보엠
  if (item.slot === '무기' || item.slot === '보조무기' || item.slot === '엠블렘') {
    const atkRate = atkStat.value === '공격력' ? parsed.attackPowerRate : parsed.magicPowerRate

    const text = []
    if (atkRate && !pot) text.push(atkStat.value.slice(0, 1) + atkRate)
    if (parsed.bossDamage) text.push('보' + parsed.bossDamage)
    if (parsed.ignoreMonsterArmor) text.push('방' + parsed.ignoreMonsterArmor)
    if (atkRate && pot) text.push(atkStat.value.slice(0, 1) + atkRate)

    if (mainStatName.value === 'HP' && parsed.maxHpRate) text.push('HP' + parsed.maxHpRate)
    if ((mainStatName.value === 'STR' || mainStatName.value === 'MIX') && parsed.strRate) text.push('힘' + parsed.strRate)
    if ((mainStatName.value === 'DEX' || mainStatName.value === 'MIX') && parsed.dexRate) text.push('덱' + parsed.dexRate)
    if (mainStatName.value === 'INT' && parsed.intRate) text.push('인' + parsed.intRate)
    if ((mainStatName.value === 'LUK' || mainStatName.value === 'MIX') && parsed.lukRate) text.push('럭' + parsed.lukRate)
    if (parsed.allStatRate) text.push('올' + parsed.allStatRate)

    if (text.length === 0) return '-'
    return text.join('⋅')
  }

  // 일반템
  const text = []
  if (parsed.itemDropRate) text.push('드' + parsed.itemDropRate)
  if (parsed.mesosObtainedRate) text.push('메' + parsed.mesosObtainedRate)
  if (parsed.cooldownReduction) text.push('쿨' + parsed.cooldownReduction)
  if (parsed.criticalDamageRate) text.push('크' + parsed.criticalDamageRate)

  if (mainStatName.value === 'HP' && parsed.maxHpRate) text.push('HP' + parsed.maxHpRate)
  else if (mainStatName.value === 'MIX') {
    if (parsed.allStatRate) text.push('올' + parsed.allStatRate)
    if (parsed.strPerLevel) text.push('9렙힘' + parsed.strPerLevel)
    if (parsed.dexPerLevel) text.push('9렙덱' + parsed.dexPerLevel)
    if (parsed.lukPerLevel) text.push('9렙럭' + parsed.lukPerLevel)
    if (parsed.strRate) text.push('힘' + parsed.strRate)
    if (parsed.dexRate) text.push('덱' + parsed.dexRate)
    if (parsed.lukRate) text.push('럭' + parsed.lukRate)
  }
  else {
    const mainStatRateKey = mainStatName.value.toLowerCase() as 'str' | 'dex' | 'int' | 'luk' + 'Rate'
    const mainPerLevelKey = mainStatName.value.toLowerCase() as 'str' | 'dex' | 'int' | 'luk' + 'PerLevel'
    const mainStatRate = parsed[mainStatRateKey as 'strRate' | 'dexRate' | 'intRate' | 'lukRate']
    const mainPerLevel = parsed[mainPerLevelKey as 'strPerLevel' | 'dexPerLevel' | 'intPerLevel' | 'lukPerLevel']

    if (mainPerLevel) text.push('9렙' + mainPerLevel)
    if (mainStatRate) text.push(mainStatRate + parsed.allStatRate + '%')
  }
  const atk = atkStat.value === '공격력' ? parsed.attackPower : parsed.magicPower
  if (atk) text.push(atkStat.value.slice(0, 1) + atk)

  if (text.length === 0) return '-'
  return text.join('⋅') + (parsed.allStatRate && mainStatName.value !== 'HP' && mainStatName.value !== 'MIX' ? '⁺' : '')
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
      const isExpired = new Date(item.dateOptionExpire) < new Date()

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
