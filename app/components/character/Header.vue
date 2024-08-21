<template>
  <div class="w-full">
    <ConfettiExplosion
      v-if="birthday"
      class="mx-auto w-full"
    />
    <div
      class="flex w-full select-none justify-center overflow-x-clip text-nowrap"
    >
      <div
        class="flex min-w-0 flex-1 flex-col items-end text-right text-5xl"
      >
        <div class="mr-[-170px]">
          <CharacterHeaderLiberation :character="character" />
        </div>
        <div class="-mt-2 mr-[-160px]">
          <CharacterHeaderBirth :character="character" />
        </div>
        <div class="-mt-2 mr-[-165px]">
          <CharacterHeaderExp :character="character" />
        </div>
        <div class="-mt-2 mr-[-175px]">
          <CharacterHeaderAccess :character="character" />
        </div>
      </div>
      <div class="-mt-48">
        <img
          :src="characterFullImageUrl"
          alt="character"
          class="pointer-events-none relative z-10 size-[448px] drop-shadow-lg [image-rendering:_pixelated]"
          draggable="false"
        >
      </div>
      <div
        class="flex min-w-0 flex-1 flex-col text-5xl"
      >
        <div class="ms-[-180px]">
          <CharacterHeaderClass :character="character" />
        </div>
        <div class="-mt-2 ms-[-170px]">
          <CharacterHeaderWorld :character="character" />
        </div>
        <div class="-mt-2 ms-[-190px]">
          <CharacterHeaderGuild :character="character" />
        </div>
        <div class="-mt-2 ms-[-205px]">
          <CharacterHeaderPopularity :character="character" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ConfettiExplosion from 'vue-confetti-explosion'

const props = defineProps<{
  character: Character | undefined
}>()
const character = toRef(props, 'character')

// 캐릭터 풀사이즈 이미지
const characterFullImageUrl = computed(() => {
  if (!character.value) return ''
  return character.value.imageUrl.replace('Character', 'Character/180')
})

// 생일 여부
const birthday = computed(() => {
  if (!character.value) return false
  const created = new Date(character.value.dateCreate)
  const now = new Date()
  const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  return kstNow.getFullYear() > created.getFullYear() && kstNow.getMonth() === created.getMonth() && kstNow.getDate() === created.getDate()
})
</script>
