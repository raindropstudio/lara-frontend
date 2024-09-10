<template>
  <div class="flex items-center justify-between">
    <div class="flex w-28 flex-col items-center justify-center">
      <div class="text-base font-normal text-gray-500">
        유니온
      </div>
      <div class="text-3xl font-bold text-lucid-violetGray">
        00000
      </div>
      <div class="text-sm font-normal text-lucidviolet-700">
        대대대마스터9
      </div>
    </div>
    <div class="flex w-28 flex-col items-center justify-center">
      <div class="text-base font-normal text-gray-500">
        레벨
      </div>
      <div class="text-3xl font-bold text-lucid-violetGray">
        {{ character?.level }}.{{ character?.expRate.toFixed(0) }}
      </div>
      <div class="text-sm font-normal text-lucidviolet-700">
        상위 0.00%
      </div>
    </div>
    <div class="flex flex-col items-center justify-center">
      <div class="text-lg font-normal text-gray-500">
        전투력
      </div>
      <div class="bg-gradient-to-r from-[#FF4D00] to-[#EB00FF] bg-clip-text text-5xl font-bold text-transparent">
        {{ combatPower }}
      </div>
      <div class="text-base font-normal text-lucidviolet-700">
        상위 0.00%
      </div>
    </div>
    <div class="flex w-28 flex-col items-center justify-center">
      <div class="text-base font-normal text-gray-500">
        {{ mainStat.statName }}
      </div>
      <div class="text-3xl font-bold text-lucid-violetGray">
        {{ mainStat.statValue }}
      </div>
      <div class="text-sm font-normal text-lucidviolet-700">
        상위 0.00%
      </div>
    </div>
    <div class="flex w-28 flex-col items-center justify-center">
      <div class="text-base font-normal text-gray-500">
        헥사 강화
      </div>
      <div class="text-3xl font-bold text-lucid-violetGray">
        00.00%
      </div>
      <div class="text-sm font-normal text-lucidviolet-700">
        00/0000
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  character: Character | undefined
}>()

const character = toRef(props, 'character')

const combatPower = computed(() => {
  const combat = character.value?.stat?.combatPower

  // 123456789 => 1억 2345만 6789
  return formatToKoreanNumber(combat ?? 0)
})

const mainStat = computed(() => {
  const stats = {
    str: character.value?.stat?.str,
    dex: character.value?.stat?.dex,
    int: character.value?.stat?.int,
    luk: character.value?.stat?.luk,
  }
  const mainStat = {
    statName: '',
    statValue: 0,
  }
  Object.entries(stats).forEach(([key, value]) => {
    if ((value ?? -1) > mainStat.statValue) {
      mainStat.statName = key.toUpperCase()
      mainStat.statValue = value ?? -1
    }
  })
  return mainStat
})

// TODO: 임시값 처리한것들 실제값 받아와서 변경하기
</script>
