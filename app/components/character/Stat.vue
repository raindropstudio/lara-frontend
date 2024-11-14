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
          <div class="-mb-8 text-left text-6xl font-black text-lucidgray-light">
            Ability
          </div>
        </div>

        <div class="flex flex-col">
          <div class="-mb-8 text-left text-6xl font-black text-lucidgray-light">
            Hyperstat
          </div>
        </div>

        <div class="flex flex-col">
          <div class="-mb-8 text-left text-6xl font-black text-lucidgray-light">
            Propensity
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatInfo from './stat/StatInfo.vue'
import type { Character } from '~/types/character.type'

defineProps<{
  character: Character
}>()
</script>
