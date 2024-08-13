<template>
  <div class="w-full">
    <div
      class="flex w-full select-none justify-center overflow-x-clip text-nowrap"
    >
      <div
        class="flex min-w-96 flex-1 flex-col items-end text-right text-5xl"
      >
        <div class="mr-[-170px] bg-gradient-to-r from-lucid-50 via-red-700 via-20% to-black to-70% bg-clip-text font-semibold text-transparent">
          제네시스 무기 해방자
        </div>
        <div class="-mt-2 mr-[-160px] bg-gradient-to-r from-lucid-50 to-lucidviolet-500 to-20% bg-clip-text font-light text-transparent">
          <span class="font-thin">#모험</span> {{ age }}<span class="font-thin">일 차</span>
        </div>
        <div class="-mt-2 mr-[-165px] bg-gradient-to-r from-lucid-50 to-lucidviolet-500 to-20% bg-clip-text font-thin text-transparent">
          #나무의 수보다 많은 경험
        </div>
        <div class="-mt-2 mr-[-175px] bg-gradient-to-r from-lucid-50 to-lucidviolet-500 to-20% bg-clip-text font-light text-transparent">
          #{{ character?.accessFlag ? '성실한' : '여유로운' }} <span class="font-thin">{{ genderText }} 모험가</span>
        </div>
      </div>
      <div
        class="relative -mt-48 shrink-0"
      >
        <img
          :src="characterFullImageUrl"
          alt="character"
          class="z-10 size-[448px] drop-shadow-lg [image-rendering:_pixelated]"
          draggable="false"
        >
      </div>
      <div
        class="flex min-w-96 flex-1 flex-col text-5xl"
      >
        <div
          class="ms-[-180px] font-extrabold text-sunnyorange"
        >
          {{ character?.class }}
        </div>
        <div class="-mt-2 ms-[-170px] font-light text-lucidviolet-700">
          <span class="font-thin text-lucidviolet-400">
            서버는 역시
          </span>
          {{ character?.worldName }}
        </div>
        <div class="-mt-2 ms-[-190px] font-medium text-lucidviolet-500">
          <div v-if="character?.guildName">
            <span class="font-extralight text-lucidviolet-400">우리길드</span>
            {{ character?.guildName }}
            <span class="font-thin text-lucidviolet-400">
              화이팅!!
            </span>
          </div>
          <div v-else>
            <span class="font-extralight text-lucidviolet-400">자유로운 영혼</span>
          </div>
        </div>
        <div class="-mt-2 ms-[-205px] font-normal text-lucidviolet-700">
          <span class="font-thin text-lucidviolet-500">
            {{ (character?.popularity ?? 0) >= 0 ? '좋아요' : '싫어요' }}
          </span>
          {{ character?.popularity }}
          <div class="-ms-3 inline-block text-4xl font-normal text-lucidviolet-300">
            <div
              v-if="(character?.popularity ?? 0) >= 0"
            >
              <IconThumbsUp class="size-9" />
            </div>
            <div v-else>
              <IconThumbsDown class="size-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { character } = defineProps<{
  character: Character | undefined
}>()

// 캐릭터 풀사이즈 이미지
const characterFullImageUrl = computed(() => {
  if (!character) return ''
  return character.imageUrl.replace('Character', 'Character/180')
})

// 캐릭터 누적일수
const age = computed(() => {
  if (!character) return 0
  const created = new Date(character.dateCreate)
  const now = new Date()
  const diff = now.getTime() - created.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
})

// 성별 텍스트
const genderText = computed(() => {
  if (!character) return ''
  if (character.gender === '남') return '소년'
  if (character.gender === '여') return '소녀'
  if (character.gender === '기타') return '쌍둥이' // 제로
  return ''
})
</script>
