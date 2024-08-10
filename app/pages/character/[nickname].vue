<template>
  <div>
    <div class="mt-20 flex items-center justify-center">
      <h1 class="bg-gradient-to-r from-lucidviolet-300 to-lucidviolet-800 bg-clip-text text-8xl font-bold text-transparent">
        {{ $route.params.nickname }}
      </h1>
    </div>
    <div v-if="status === 'pending'" />
    <div
      v-else
      class="relative -mt-48 h-[448px] w-full"
    >
      <img
        :src="characterImageUrlRewriter(character?.imageUrl)"
        alt="character"
        class="pointer-events-none absolute inset-x-0 m-auto size-[448px] drop-shadow-lg [image-rendering:_pixelated]"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { status, data: character } = await useLara<Character>(`character/${route.params.nickname}`)
watch (character, (newCharacter) => {
  console.log(newCharacter)
})

// 캐릭터 풀사이즈 이미지로 변경
const characterImageUrlRewriter = (imageUrl: string | undefined) => {
  if (!imageUrl) return ''
  return imageUrl.replace('Character', 'Character/180')
}
</script>
