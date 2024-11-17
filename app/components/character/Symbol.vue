<template>
  <div>
    <div class="flex flex-col py-12">
      <div class="text-8xl font-black text-lucidgray-light">
        Symbol
      </div>
      <div class="my-12 flex flex-col items-center justify-around gap-8">
        <div class="flex flex-col items-stretch">
          <div class="flex items-start justify-between gap-8">
            <div class="text-6xl font-extrabold text-lucidgray-light">
              아케인
            </div>
            <div class="flex items-start gap-4">
              <div class="flex items-start">
                <div class="text-3xl font-semibold text-lucidgray-medium">
                  ARC
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ arcane?.reduce((sum, symbol) => sum + symbol.force, 0) }}
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-3xl font-semibold text-lucidgray-medium">
                  {{ mainStat === 'mix' ? 'ALL' : mainStat?.toUpperCase() }}
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ getStatSum(arcane) }}
                </div>
              </div>
            </div>
          </div>
          <div class="-mt-2 flex justify-center gap-4">
            <template
              v-for="(arcName, idx) in arcaneMapper"
              :key="idx"
            >
              <SymbolTooltip :symbol="mappedArcane[idx]">
                <div class="flex flex-col">
                  <div
                    class="overflow-hidden rounded-lg bg-white shadow-md ring-2"
                    :class="{
                      'ring-lucidgray-medium': mappedArcane[idx]?.force && mappedArcane[idx]?.level !== 20,
                      'ring-lucidgray-light': !mappedArcane[idx]?.force,
                      'ring-lucidviolet-500': mappedArcane[idx]?.level === 20,
                    }"
                  >
                    <div
                      class="flex h-12 w-[132px] items-center justify-center gap-2"
                    >
                      <img
                        :src="arcImage[idx]"
                        :alt="arcName"
                        class="ml-2 size-8 object-contain [image-rendering:pixelated]"
                        :class="{ 'opacity-40': !mappedArcane[idx]?.force }"
                      >
                      <div
                        class="flex h-7 w-[84px] grow flex-col items-stretch justify-start"
                      >
                        <div
                          v-if="mappedArcane[idx]?.force"
                          class="text-xl font-medium text-lucidviolet-700"
                        >
                          <span class="text-lg">Lv.</span>
                          {{ mappedArcane[idx]?.level === 20 ? 'MAX' : mappedArcane[idx]?.level }}
                        </div>
                        <div
                          v-if="mappedArcane[idx]?.force"
                          class="-mr-1 -mt-3 text-right text-3xl font-black text-lucidgray-light"
                        >
                          {{ getArcanePercent(mappedArcane[idx]).toFixed(0) + '%' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SymbolTooltip>
            </template>
          </div>
        </div>
        <div
          v-if="(authentic?.length ?? 0) > 0"
          class="flex flex-col items-stretch"
        >
          <div class="flex items-start justify-between gap-8">
            <div class="text-6xl font-extrabold text-lucidgray-light">
              어센틱
            </div>
            <div class="flex items-start gap-4">
              <div class="flex items-start">
                <div class="text-3xl font-semibold text-lucidgray-medium">
                  AUT
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ authentic?.reduce((sum, symbol) => sum + symbol.force, 0) }}
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-3xl font-semibold text-lucidgray-medium">
                  {{ mainStat === 'mix' ? 'ALL' : mainStat?.toUpperCase() }}
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ getStatSum(authentic) }}
                </div>
              </div>
            </div>
          </div>
          <div class="-mt-2 flex justify-center gap-4">
            <template
              v-for="(autSymbol, idx) in authenticMapper"
              :key="idx"
            >
              <SymbolTooltip :symbol="mappedAuthentic[idx]">
                <div class="flex flex-col">
                  <div
                    class="overflow-hidden rounded-lg bg-white shadow-md ring-2"
                    :class="{
                      'ring-lucidgray-medium': mappedAuthentic[idx]?.force && mappedAuthentic[idx]?.level !== 11,
                      'ring-lucidgray-light': !mappedAuthentic[idx]?.force,
                      'ring-lucidviolet-500': mappedAuthentic[idx]?.level === 11,
                    }"
                  >
                    <div
                      class="flex h-12 w-[132px] items-center justify-center gap-2"
                    >
                      <img
                        :src="authenticImage[idx]"
                        :alt="autSymbol"
                        class="ml-2 size-8 object-contain [image-rendering:pixelated]"
                        :class="{ 'opacity-40': !mappedAuthentic[idx]?.force }"
                      >
                      <div
                        class="flex h-7 w-[84px] grow flex-col items-stretch justify-start"
                      >
                        <div
                          v-if="mappedAuthentic[idx]?.force"
                          class="text-xl font-medium text-lucidviolet-700"
                        >
                          <span class="text-lg">Lv.</span>
                          {{ mappedAuthentic[idx]?.level === 11 ? 'MAX' : mappedAuthentic[idx]?.level }}
                        </div>
                        <div
                          v-if="mappedAuthentic[idx]?.force"
                          class="-mr-1 -mt-3 text-right text-3xl font-black text-lucidgray-light"
                        >
                          {{ getAuthenticPercent(mappedAuthentic[idx]).toFixed(0) + '%' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SymbolTooltip>
            </template>
          </div>
        </div>
        <div
          v-if="(grandAuthentic?.length ?? 0) > 0"
          class="flex flex-col items-stretch"
        >
          <div class="flex items-start justify-between gap-8">
            <div class="text-6xl font-extrabold text-lucidgray-light">
              그랜드 어센틱
            </div>
            <div class="flex items-start gap-4">
              <div class="flex items-start">
                <div class="text-3xl font-semibold text-lucidgray-medium">
                  AUT
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ grandAuthentic?.reduce((sum, symbol) => sum + symbol.force, 0) }}
                </div>
                <div class="ml-4 text-3xl font-semibold text-lucidgray-medium">
                  EXP
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ grandAuthentic?.reduce((sum, symbol) => sum + symbol.expRate, 0) }}%
                </div>
                <div class="ml-4 text-3xl font-semibold text-lucidgray-medium">
                  <div class="flex w-16 flex-col text-xl">
                    <span class="text-start">MESO</span>
                    <span class="-mt-3 text-end">ITEM</span>
                  </div>
                </div>
                <div class="text-5xl font-extralight text-lucidviolet-700">
                  {{ grandAuthentic?.reduce((sum, symbol) => sum + symbol.mesoRate, 0) }}%
                </div>
              </div>
            </div>
          </div>
          <div class="-mt-2 flex justify-center gap-4">
            <template
              v-for="(autSymbol, idx) in grandAuthenticMapper"
              :key="idx"
            >
              <SymbolTooltip :symbol="mappedGrandAuthentic[idx]">
                <div class="flex flex-col">
                  <div
                    class="overflow-hidden rounded-lg bg-white shadow-md ring-2"
                    :class="{
                      'ring-lucidgray-medium': mappedGrandAuthentic[idx]?.force && mappedGrandAuthentic[idx]?.level !== 11,
                      'ring-lucidgray-light': !mappedGrandAuthentic[idx]?.force && autSymbol !== '',
                      'ring-slate-100': autSymbol === '',
                      'ring-lucidviolet-500': mappedGrandAuthentic[idx]?.level === 11,
                    }"
                  >
                    <div
                      class="flex h-12 w-[132px] items-center justify-center gap-2"
                    >
                      <img
                        v-if="grandAuthenticImage[idx]"
                        :src="grandAuthenticImage[idx]"
                        :alt="autSymbol"
                        class="ml-2 size-8 object-contain [image-rendering:pixelated]"
                        :class="{ 'opacity-40': !mappedGrandAuthentic[idx]?.force }"
                      >
                      <div
                        class="flex h-7 w-[84px] grow flex-col items-stretch justify-start"
                      >
                        <div
                          v-if="mappedGrandAuthentic[idx]?.force"
                          class="text-xl font-medium text-lucidviolet-700"
                        >
                          <span class="text-lg">Lv.</span>
                          {{ mappedGrandAuthentic[idx]?.level === 11 ? 'MAX' : mappedGrandAuthentic[idx]?.level }}
                        </div>
                        <div
                          v-if="mappedGrandAuthentic[idx]?.force"
                          class="-mr-1 -mt-3 text-right text-3xl font-black text-lucidgray-light"
                        >
                          {{ getAuthenticPercent(mappedGrandAuthentic[idx]).toFixed(0) + '%' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SymbolTooltip>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SymbolTooltip from '../ui/SymbolTooltip.vue'
import type { Symbol } from '~/types/symbol.type'
import { getSymbolImageUrl } from '~/utils/getImageUrl'

const props = defineProps<{
  character: Character | undefined
}>()

const character = toRef(props, 'character')
const symbol = computed(() => character.value?.symbol)

const arcaneMapper = [
  '아케인심볼 : 소멸의 여로',
  '아케인심볼 : 츄츄 아일랜드',
  '아케인심볼 : 레헬른',
  '아케인심볼 : 아르카나',
  '아케인심볼 : 모라스',
  '아케인심볼 : 에스페라',
]
const arcImage = await Promise.all(arcaneMapper.map(name => getSymbolImageUrl(name)))
const arcane = computed(() => symbol.value?.filter(symbol => symbol.name.startsWith('아케인')))
const mappedArcane = computed(() => {
  return arcaneMapper.map(name => arcane.value?.find(symbol => symbol.name === name))
})

const authenticMapper = [
  '어센틱심볼 : 세르니움',
  '어센틱심볼 : 아르크스',
  '어센틱심볼 : 오디움',
  '어센틱심볼 : 도원경',
  '어센틱심볼 : 아르테리아',
  '어센틱심볼 : 카르시온',
]
const authenticImage = await Promise.all(authenticMapper.map(name => getSymbolImageUrl(name)))
const authentic = computed(() => symbol.value?.filter(symbol => symbol.name.startsWith('어센틱')))
const mappedAuthentic = computed(() => {
  return authenticMapper.map(name => authentic.value?.find(symbol => symbol.name === name))
})

const grandAuthenticMapper = [
  '그랜드 어센틱심볼 : 탈라하트',
  '',
  '',
  '',
  '',
  '',
]
const grandAuthenticImage = await Promise.all(
  grandAuthenticMapper
    .filter(name => name !== '')
    .map(name => getSymbolImageUrl(name)),
)

const grandAuthentic = computed(() => symbol.value?.filter(symbol => symbol.name.startsWith('그랜드 어센틱')))
const mappedGrandAuthentic = computed(() => {
  return grandAuthenticMapper.map(name => grandAuthentic.value?.find(symbol => symbol.name === name))
})

const mainStat = findMainStat(character.value)

const getStatSum = (symbols: Symbol[] | undefined) => {
  if (!mainStat || !symbols) return 0
  if (mainStat === 'mix') {
    return symbols.reduce((sum, symbol) => sum + symbol.str, 0)
  }
  return symbols.reduce((sum, symbol) => sum + symbol[mainStat], 0)
}

const getArcanePercent = (symbol: Symbol) => {
  // 레벨당 필요치: n^2 + 11
  const psum = [0, 12, 27, 47, 74, 110, 157, 217, 292, 384, 495, 627, 782, 962, 1169, 1405, 1672, 1972, 2307, 2679]
  return ((psum[symbol.level - 1] ?? 0) + symbol.growthCount) / 2679 * 100
}

const getAuthenticPercent = (symbol: Symbol) => {
  // 레벨당 필요치 9n^2 + 20n
  const psum = [0, 29, 105, 246, 470, 795, 1239, 1820, 2556, 3456, 4565]
  return ((psum[symbol.level - 1] ?? 0) + symbol.growthCount) / 4565 * 100
}
</script>
