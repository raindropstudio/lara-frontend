<template>
  <div>
    <div class="flex flex-col py-12">
      <!-- 헤더 영역 -->
      <div class="flex items-end justify-between">
        <div class="text-8xl font-black text-lucidgray-light">
          Link
        </div>
      </div>

      <!-- 스킬 그리드 영역 -->
      <div class="my-12 flex flex-col items-start justify-center gap-y-12">
        <div class="flex w-full flex-wrap items-start justify-evenly gap-y-12">
          <div>
            <p class="mb-4 text-2xl font-light text-lucidviolet-700">
              내 링크 스킬
            </p>
            <div class="flex w-80 flex-col gap-4 rounded-2xl border-4 border-lucidgray-light bg-white p-4">
              <div class="flex items-start gap-4">
                <div class="flex shrink-0 flex-col items-center">
                  <img
                    v-if="linkSkill[0]?.ownedSkill.icon"
                    :src="getSkillImageUrl(linkSkill[0]?.ownedSkill.icon)"
                    class="size-14 object-contain [image-rendering:pixelated]"
                  >
                  <div
                    v-else
                    class="mb-4 size-14 rounded-xl border-4 border-lucidgray-light bg-gray-100 shadow-md"
                  />
                </div>
                <div>
                  <p
                    v-if="formattedSkillName"
                    class="text-xl font-medium text-lucidgray-dark"
                  >
                    {{ formattedSkillName }}
                  </p>
                  <p
                    v-else
                    class="text-xl font-medium text-lucidgray-medium"
                  >
                    링크 스킬 정보가 없어요!
                  </p>
                  <p
                    v-if="linkSkill[0]?.ownedSkill.level"
                    class="text-lg font-light text-lucidgray-dark"
                  >
                    Lv. <span class="font-medium">{{ linkSkill[0]?.ownedSkill.level }}</span> / {{ masterLevel }}
                  </p>
                </div>
              </div>
              <div
                v-if="formattedDescription"
                class="flex flex-col gap-2"
              >
                <p class="whitespace-break-spaces text-sm font-light text-lucidgray-dark">
                  {{ formattedDescription }}
                </p>
                <p class="whitespace-break-spaces text-sm font-light text-lucid-violetgray">
                  {{ linkSkill[0]?.ownedSkill.effect }}
                </p>
              </div>
              <div
                v-else
                class="flex flex-col gap-2"
              >
                <span class="whitespace-break-spaces text-sm font-light text-lucidgray-dark">게임 내에서 링크 스킬 정보를 확인해주세요.
                </span>
              </div>
            </div>
          </div>
          <CharacterSkillIconView
            title="전수받은 링크 스킬"
            :skills="linkSkill[0]?.skill"
            :slot-count="12"
            class="px-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  character?: Character
}>()

const { character } = toRefs(props)

const linkSkill = computed(() => character.value?.linkSkill ?? [])

const formattedDescription = computed(() => {
  return linkSkill.value[0]?.ownedSkill.description?.replace(/^[^\n]*\n/, '') ?? ''
})

const masterLevel = computed(() => {
  const firstLine = linkSkill.value[0]?.ownedSkill.description?.split('\n')[0] ?? ''
  return firstLine.match(/\[\s*마스터\s*레벨\s*:\s*(\d+)\s*\]/)?.[1] ?? ''
})

const formattedSkillName = computed(() => {
  return linkSkill.value[0]?.ownedSkill.name?.replace(/\s*\([^)]*\)/g, '') ?? ''
})
</script>
