<template>
  <div>
    <div class="flex flex-col py-12">
      <div class="flex items-end justify-between">
        <div class="text-8xl font-black text-lucidgray-light">
          HEXA
        </div>

        <div class="mb-4 flex items-end justify-end gap-2">
          <div class="flex items-center gap-1 text-lucidgray-dark">
            <IconInfo class="size-4" />
            <p class="text-2xl font-extralight">
              진행률
            </p>
          </div>
          <span class="text-5xl font-extralight text-lucidviolet-700">{{ (erdaProgress.currentErdaPiece / erdaProgress.totalErdaPiece * 100).toFixed(2) }}%</span>
        </div>
      </div>

      <div class="my-12 flex flex-col items-start justify-center gap-y-12">
        <div class="flex w-full flex-wrap items-start justify-evenly gap-y-12">
          <CharacterSkillIconView
            title="스킬코어"
            :skills="skillCores"
            class="px-4"
          />
          <CharacterSkillIconView
            title="공용코어"
            :skills="commonCores"
            class="px-4"
          />
        </div>
        <div class="flex w-full flex-wrap items-start justify-evenly gap-y-12">
          <CharacterSkillIconView
            title="마스터리코어"
            :skills="masteryCores"
            class="px-4"
          />
          <CharacterSkillIconView
            title="강화코어"
            :skills="enhanceCores"
            class="px-4"
          />
        </div>
      </div>
      <div>
        <!-- TODO 헥사스텟 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '#imports'
import type { Skill } from '~/types/skill.type'

const props = defineProps<{
  character?: Character
}>()

const { character } = toRefs(props)

// 헥사 스킬만 필터링 (grade가 '6'인 스킬)
const hexaSkills = computed(() => character.value?.skill?.filter((skill: Skill) => skill.grade === '6') ?? [])
const hexaCores = computed(() => character.value?.skillCore?.filter(core => core.skillCore.grade === 6) ?? [])

// 스킬 이름으로 스킬 정보를 찾는 함수
const findSkillByName = (name: string | undefined) => {
  if (!name) return undefined
  return hexaSkills.value.find(skill => skill.name === name)
}

// 스킬 타입별로 분류
const skillCoreCores = computed(() => hexaCores.value.filter(core => core.skillCore.coreType === '스킬 코어'))
const skillCores = computed(() => {
  return skillCoreCores.value.flatMap(core =>
    core.skillCore.coreSkill
      .map(skillName => findSkillByName(skillName))
      .filter((skill): skill is Skill => skill !== undefined),
  )
})

const masteryCoreCores = computed(() => hexaCores.value.filter(core => core.skillCore.coreType === '마스터리 코어'))
const masteryCores = computed(() => {
  return masteryCoreCores.value.flatMap(core =>
    core.skillCore.coreSkill
      .map(skillName => findSkillByName(skillName))
      .filter((skill): skill is Skill => skill !== undefined),
  )
})

const commonCoreCores = computed(() => hexaCores.value.filter(core => core.skillCore.coreType === '공용 코어'))
const commonCores = computed(() => {
  return commonCoreCores.value.flatMap(core =>
    core.skillCore.coreSkill
      .map(skillName => findSkillByName(skillName))
      .filter((skill): skill is Skill => skill !== undefined),
  )
})

const enhanceCoreCores = computed(() => hexaCores.value.filter(core => core.skillCore.coreType === '강화 코어'))
const enhanceCores = computed(() => {
  return enhanceCoreCores.value.flatMap(core =>
    core.skillCore.coreSkill
      .map(skillName => findSkillByName(skillName))
      .filter((skill): skill is Skill => skill !== undefined),
  )
})

const erdaProgress = computed(() => getHexaProgress(character.value))
</script>
