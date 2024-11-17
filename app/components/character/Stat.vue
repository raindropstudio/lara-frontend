<template>
  <div class="flex w-full flex-col py-12">
    <div class="text-8xl font-black text-lucidgray-light">
      Stats
    </div>
    <div class="my-12 flex items-start justify-around">
      <div class="flex flex-col">
        <StatInfo :character="character" />
      </div>

      <div class="flex flex-col gap-12">
        <div class="flex flex-col">
          <div class="text-left text-6xl font-black text-lucidgray-light">
            어빌리티
          </div>
          <AbilitySection
            v-if="character?.ability"
            :ability="character.ability"
          />
        </div>

        <div class="flex flex-col">
          <div class="text-left text-6xl font-black text-lucidgray-light">
            하이퍼스탯
          </div>
          <HyperStatSection
            v-if="character?.hyperStatPreset"
            :hyper-stat-preset="character.hyperStatPreset"
          />
        </div>

        <div class="flex flex-col">
          <div class="text-left text-6xl font-black text-lucidgray-light">
            성향
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AbilitySection from './stat/AbilitySection.vue'
import HyperStatSection from './stat/HyperStatSection.vue'
import StatInfo from './stat/StatInfo.vue'
import type { Character } from '~/types/character.type'

defineProps<{
  character: Character
}>()
</script>
