<template>
  <div class="">
    <p class="mb-4 text-2xl font-light text-lucidviolet-700">
      {{ title }}
    </p>
    <div class="grid grid-cols-4 gap-8">
      <template
        v-for="(skill, index) in sortedSkills"
        :key="index"
      >
        <div class="flex flex-col items-center">
          <img
            :src="getSkillImageUrl(skill.icon)"
            class="size-16 object-contain [image-rendering:pixelated]"
          >
          <div
            class="-mt-3 flex h-7 w-12 items-center justify-center rounded-lg border-[2.5px] bg-white"
            :class="skill.level === 30 ? 'border-lucidviolet-700' : 'border-lucidgray-medium'"
          >
            <span
              class="text-lg font-medium"
              :class="skill.level === 30 ? 'text-lucidviolet-800' : 'text-lucidgray-dark'"
            >{{ skill.level }}</span>
          </div>
        </div>
      </template>
      <template
        v-for="index in getEmptyCount"
        :key="'empty-' + index"
      >
        <div
          class="mb-4 size-16 rounded-xl border-4 border-lucidgray-light bg-gray-100 shadow-md"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  skills?: Skill[]
}>()

const { skills } = toRefs(props)

const sortedSkills = computed(() => {
  return [...(skills.value ?? [])].sort((a, b) => b.level - a.level)
})

const getEmptyCount = computed(() => {
  // 마지막줄 4의 배수 맞춰주고, skill 이 하나도 없으면 빈칸 4개
  const count = (4 - (skills.value?.length ?? 0) % 4) % 4
  return skills.value?.length === 0 ? 4 : count
})
</script>
