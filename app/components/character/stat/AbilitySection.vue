<template>
  <PresetCard
    point-label="명성치"
    :remain-point="ability.remainFame"
    :selected-preset-no="selectedPresetNo"
    :is-active-preset="(presetNo: number) => ability.preset.find(p => p.presetNo === presetNo)?.active ?? false"
    @update:selected-preset-no="selectedPresetNo = $event"
  >
    <template #preset-info>
      <div
        v-for="abilityInfo in selectedPreset?.abilityInfo"
        :key="abilityInfo.abilityNo"
        class="flex items-center gap-2"
      >
        <div
          class="h-3 w-1 rounded-full"
          :class="getAbilityBackgroundColor(abilityInfo.abilityGrade)"
        />
        <span class="text-sm text-lucidviolet-900">{{ abilityInfo.abilityValue }}</span>
      </div>
    </template>
  </PresetCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PresetCard from '~/components/character/stat/PresetCard.vue'
import type { Ability, AbilityGrade } from '~/types/ability.type'

const props = defineProps<{
  ability: Ability
}>()

const activePreset = computed(() =>
  props.ability.preset.find(preset => preset.active),
)

const selectedPresetNo = ref(activePreset.value?.presetNo ?? 1)

const selectedPreset = computed(() =>
  props.ability.preset.find(preset => preset.presetNo === selectedPresetNo.value),
)

const getAbilityBackgroundColor = (grade: AbilityGrade) => {
  switch (grade) {
    case 'LEGENDARY':
      return 'bg-potential-legendary'
    case 'UNIQUE':
      return 'bg-potential-unique'
    case 'EPIC':
      return 'bg-potential-epic'
    case 'RARE':
      return 'bg-potential-rare'
    default:
      return 'bg-potential-normal'
  }
}
</script>
