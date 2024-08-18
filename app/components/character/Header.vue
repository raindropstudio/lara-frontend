<template>
  <div class="w-full">
    <ConfettiExplosion
      v-if="age.text === '주년'"
      class="mx-auto"
    />
    <div
      class="flex w-full select-none justify-center overflow-x-clip text-nowrap"
    >
      <div
        class="flex min-w-96 flex-1 flex-col items-end text-right text-5xl"
      >
        <div
          class="mr-[-160px] bg-gradient-to-r from-lucid-50 via-20% to-black to-70% bg-clip-text font-semibold text-transparent"
          :class="typeof liberation === 'object' ? liberation.class : ''"
        >
          {{ liberation.text }}
        </div>
        <div class="-mt-2 mr-[-160px]">
          <span class="bg-gradient-to-r from-lucid-50 to-lucidviolet-500 to-40% bg-clip-text font-thin text-transparent">#모험 </span>
          <span
            v-if="age.text === '주년'"
            class="bg-gradient-to-tr from-sunnyorange to-yellow-300 bg-clip-text font-medium text-transparent"
          >
            <IconPopper class="-mx-2 inline size-9 text-sunnyorange" />
            {{ age.number }}{{ age.text }}
            <IconPopper class="-mx-2 inline size-9 -scale-x-100 text-sunnyorange" />
          </span>
          <span
            v-else
            class="text-lucidviolet-500"
          >
            {{ age.number }}<span class="font-thin">{{ age.text }}</span>
          </span>
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
          class="ms-[-180px] font-extrabold text-emerald-700"
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
            {{ popularityText }}
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

// 제네시스 무기 해방여부멘트
const liberation = computed(() => {
  if (!character.value) return { text: '', class: '' }
  if (character.value.liberationQuestClear) return { text: '제네시스 무기의 주인', class: 'via-red-700' }
  if (character.value.level < 200) return { text: '성장의 길 위에 선', class: 'via-blue-700' }
  return { text: '검은마법사의 대적자', class: 'via-red-700' }
})

// 캐릭터 누적일수
const age = computed(() => {
  if (!character.value) return { number: 0, text: '을 언제 시작했더라' }
  const created = new Date(character.value.dateCreate)
  const now = new Date()
  const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))

  if (kstNow.getFullYear() > created.getFullYear() && kstNow.getMonth() === created.getMonth() && kstNow.getDate() === created.getDate()) {
    return {
      number: kstNow.getFullYear() - created.getFullYear(),
      text: '주년',
    }
  }

  const diff = now.getTime() - created.getTime()
  return {
    number: Math.floor(diff / (1000 * 60 * 60 * 24)),
    text: '일 차',
  }
})

// 성별 텍스트
const genderText = computed(() => {
  if (!character.value) return ''
  if (character.value.gender === '남') return '소년'
  if (character.value.gender === '여') return '소녀'
  if (character.value.gender === '기타') return '쌍둥이' // 제로
  return ''
})

// 캐릭터 인기도 멘트
const popularityText = computed(() => {
  if (!character.value) return ''
  if (character.value.popularity >= 99999) return '메이플의 슈퍼스타'
  if (character.value.popularity >= 50000) return '메이플 셀러브리티'
  if (character.value.popularity >= 10000) return '메이플의 아이돌'
  if (character.value.popularity >= 5000) return '메이플 라이징스타'
  if (character.value.popularity >= 1000) return '메이플의 인기인'
  if (character.value.popularity >= 500) return '걸어다니는 좋아요'
  if (character.value.popularity >= 100) return '모두가 좋아하는'
  if (character.value.popularity >= 10) return '좋아요 수집가'
  if (character.value.popularity === 1) return '친구가 눌러준'
  if (character.value.popularity === 0) return '중립적인 사람'
  if (character.value.popularity === -1) return '실수로 비추누른'
  if (character.value.popularity <= -99999) return '어둠의 슈퍼스타'
  return '싫어요'
})

const jobInfoMap: { [key: string]: { prefix: string, group: string } } = {
  // 모험가 직업군
  '히어로': { prefix: '전설적인', group: '모험가' },
  '팔라딘': { prefix: '빛의 수호자', group: '모험가' },
  '다크나이트': { prefix: '어둠의', group: '모험가' },
  '비숍': { prefix: '빛을 다루는', group: '모험가' },
  '나이트로드': { prefix: '그림자 속의', group: '모험가' },
  '섀도어': { prefix: '암흑의', group: '모험가' },
  '듀얼블레이드': { prefix: '양손검의', group: '모험가' },
  '아크메이지(불,독)': { prefix: '불과 독을 다루는', group: '모험가' },
  '아크메이지(썬,콜)': { prefix: '태양과 냉기를 다루는', group: '모험가' },
  '캡틴': { prefix: '바다를 누비는', group: '모험가' },
  '캐논슈터': { prefix: '포탄을 날리는', group: '모험가' },

}

const defaultJobInfo = { prefix: '전설적인', group: '알 수 없는 직업군' }

const jobInfo = computed(() => {
  if (!character.value) return defaultJobInfo

  const className = character.value.class
  return jobInfoMap[className] || defaultJobInfo // 직업군 매핑 테이블에서 정보를 찾아 반환
})
</script>
