<template>
  <div>
    <div
      ref="captureElement"
      class="relative flex flex-col items-center justify-center"
    >
      <div class="mt-20 flex items-center justify-center">
        <h1
          class="z-10 bg-gradient-to-r from-lucidviolet-300 to-lucidviolet-800 bg-clip-text text-8xl font-bold text-transparent"
          :class="initStatus === 'pending' ? 'animate-pulse' : ''"
          @click="initStatus === 'error' && navigateTo(`/character?input=${$route.params.nickname}`)"
        >
          {{ $route.params.nickname }}
        </h1>
        <ClientOnly>
          <HTransitionRoot
            class="absolute right-8 text-lucidviolet-500"
            :show="initStatus === 'success'"
            enter="transition-opacity duration-300 ease-in"
            enter-from="opacity-0"
            enter-to="opacity-100"
          >
            <div>
              <button
                v-if="character"
                title="즐겨찾기"
                class="rotate-12"
                @click="changeStarred"
              >
                <UiTooltip>
                  <IconStar
                    v-if="isStarred"
                    class="size-56 text-sunnyorange/30"
                  />
                  <IconStarOutline
                    v-else
                    class="size-56 text-lucidviolet-200/30"
                  />
                  <template #tooltip>
                    <div>
                      즐겨찾기
                    </div>
                  </template>
                </UiTooltip>
              </button>
            </div>
          </HTransitionRoot>
        </ClientOnly>
      </div>
      <div
        ref="header"
        class="z-10 h-64 w-full"
      >
        <HTransitionRoot
          appear
          :show="initStatus === 'pending'"
          class="delay-300"
          enter="transition-opacity duration-300 ease-in"
          enter-from="opacity-0"
          enter-to="opacity-100"
        >
          <CharacterLoading />
        </HTransitionRoot>
        <HTransitionRoot
          appear
          :show="initStatus === 'error'"
          enter="transition-opacity duration-100 ease-in"
          enter-from="opacity-0"
          enter-to="opacity-100"
        >
          <CharacterError />
        </HTransitionRoot>
        <HTransitionRoot
          :show="initStatus === 'success'"
          enter="transition-opacity duration-300 ease-in"
          enter-from="opacity-0"
          enter-to="opacity-100"
        >
          <CharacterHeader
            :character="character"
          />
        </HTransitionRoot>
      </div>
      <HTransitionRoot
        :show="initStatus === 'success'"
        enter="transition-opacity duration-300 ease-in"
        enter-from="opacity-0"
        enter-to="opacity-100"
        class="flex w-full flex-col items-center justify-center"
      >
        <div
          class="sticky top-4 z-30"
        >
          <div class="flex items-center justify-center gap-2">
            <CharacterNav
              :character-image-url="character?.imageUrl"
              :show-image="!headerIsVisible"
              :updated-at="character?.updatedAt"
              :update-status="updateStatus"
              :current-section="headerIsVisible ? '' : currentSection"
              @refresh="updateCharacter"
            />
            <ClientOnly>
              <div class="flex gap-2">
                <button
                  v-if="character"
                  title="이미지로 복사"
                  class="flex items-center justify-center rounded-full bg-lucidviolet-500 p-2 text-white shadow-lg transition-all duration-200 hover:bg-lucidviolet-600 hover:shadow-xl"
                  :disabled="copyStatus === 'pending'"
                  @click="copyPageAsImage"
                >
                  <UiTooltip>
                    <IconSpinner
                      v-if="copyStatus === 'pending'"
                      class="size-4 animate-spin"
                    />
                    <svg
                      v-else
                      class="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <template #tooltip>
                      <div>
                        {{ copyStatus === 'success' ? '복사 완료!' : copyStatus === 'error' ? '복사 실패' : '이미지로 복사' }}
                      </div>
                    </template>
                  </UiTooltip>
                </button>
                <button
                  v-if="character"
                  title="이미지로 저장"
                  class="flex items-center justify-center rounded-full bg-emerald-500 p-2 text-white shadow-lg transition-all duration-200 hover:bg-emerald-600 hover:shadow-xl"
                  :disabled="saveStatus === 'pending'"
                  @click="savePageAsImage"
                >
                  <UiTooltip>
                    <IconSpinner
                      v-if="saveStatus === 'pending'"
                      class="size-4 animate-spin"
                    />
                    <svg
                      v-else
                      class="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <template #tooltip>
                      <div>
                        {{ saveStatus === 'success' ? '저장 완료!' : saveStatus === 'error' ? '저장 실패' : '이미지로 저장' }}
                      </div>
                    </template>
                  </UiTooltip>
                </button>
              </div>
            </ClientOnly>
          </div>
        </div>
        <div
          id="summary"
          ref="summary"
          class="mb-4 w-full max-w-screen-xl px-4 py-12"
        >
          <CharacterSummary
            :character="character"
          />
        </div>
        <div
          id="equipment"
          ref="equipment"
          class="w-full"
        >
          <div
            class="w-full bg-white"
          >
            <div class="mx-auto max-w-screen-xl">
              <CharacterEquipment
                :character="character"
              />
            </div>
          </div>
          <div class="w-full">
            <div class="mx-auto max-w-screen-xl">
              <CharacterCoordinate
                :character="character"
              />
            </div>
          </div>
          <div class="w-full bg-white">
            <div class="mx-auto max-w-screen-xl">
              <CharacterSymbol
                :character="character"
              />
            </div>
          </div>
        </div>
        <div
          id="skill"
          ref="skill"
          class="w-full"
        >
          <div class="w-full">
            <div class="mx-auto max-w-screen-xl">
              <CharacterHexaSkill
                :character="character"
              />
            </div>
          </div>
          <div class="w-full bg-white">
            <div class="mx-auto max-w-screen-xl">
              <CharacterVSkill
                :character="character"
              />
            </div>
          </div>
          <div class="w-full">
            <div class="mx-auto w-full max-w-screen-xl">
              <CharacterLinkSkill
                :character="character"
              />
            </div>
          </div>
        </div>
        <div
          id="stat"
          ref="stat"
          class="w-full"
        >
          <div class="w-full bg-white">
            <div class="mx-auto w-full max-w-screen-xl px-4">
              <CharacterStat
                v-if="character"
                :character="character"
              />
            </div>
          </div>
        </div>
        <div
          id="union"
          ref="union"
          class="w-full py-24"
        >
          <div class="flex h-60 items-center justify-center">
            <span class="text-5xl font-extralight text-lucidgray-light">작업중!</span>
          </div>
        </div>
      </HTransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as htmlToImage from 'html-to-image'
import type { AsyncDataRequestStatus } from '#app'

const route = useRoute()
const history = useHistoryStore()

useHead({
  title: `${route.params.nickname} | lara.moe`,
})

const header = ref<HTMLElement | null>(null)
const headerIsVisible = useElementVisibility(header)

const { status: initStatus, data: character } = useLara<Character>(`character/${route.params.nickname}`)

const updateStatus = ref<AsyncDataRequestStatus>('idle')

const updateCharacter = async () => {
  updateStatus.value = 'pending'

  try {
    const data = await fetchLara<Character>(`character/${route.params.nickname}`, {
      params: {
        update: true,
      },
    })
    if (data) {
      updateStatus.value = 'success'
      character.value = data
      // 정보 갱신시 검색기록 정보도 갱신
      history.updateHistory('character', character.value?.nickname, extractHistoryData(character.value))
    }
    else {
      updateStatus.value = 'error'
    }
  }
  catch {
    updateStatus.value = 'error'
  }
}

const extractHistoryData = (character: Character) => {
  return {
    nickname: character.nickname,
    imageUrl: character.imageUrl,
    level: character.level,
    class: character.class,
    guildName: character.guildName,
    worldName: character.worldName,
  }
}

// 캐릭터 로딩 성공시 검색기록 추가
watch(initStatus, (newStatus) => {
  if (newStatus === 'success' && character.value) {
    history.addHistory('character', character.value?.nickname, extractHistoryData(character.value))
  }
})
onActivated(() => {
  if (initStatus.value === 'success' && character.value) {
    history.addHistory('character', character.value?.nickname, extractHistoryData(character.value))
  }
})

// 즐겨찾기
const isStarred = computed(() => {
  return history.favorite.some(entry => entry.type === 'character' && entry.info.nickname === character.value?.nickname)
})
const changeStarred = () => {
  if (character.value) {
    if (isStarred.value) {
      history.deleteFavorite('character', character.value.nickname)
    }
    else {
      history.addFavorite('character', character.value.nickname)
    }
  }
}

// 메뉴바
const currentSection = ref('')
const summary = ref<HTMLElement | null>(null)
const equipment = ref<HTMLElement | null>(null)
const skill = ref<HTMLElement | null>(null)
const stat = ref<HTMLElement | null>(null)
const union = ref<HTMLElement | null>(null)

const sections = [
  { key: 'summary', ref: summary },
  { key: 'equipment', ref: equipment },
  { key: 'skill', ref: skill },
  { key: 'stat', ref: stat },
  { key: 'union', ref: union },
]

sections.forEach((section) => {
  useIntersectionObserver(section.ref, (entries) => {
    if (entries[0]?.isIntersecting) {
      currentSection.value = section.key
    }
  }, {
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0,
  })
})

const captureElement = ref<HTMLElement | null>(null)
const copyStatus = ref<AsyncDataRequestStatus>('idle')
const saveStatus = ref<AsyncDataRequestStatus>('idle')

const copyPageAsImage = async () => {
  copyStatus.value = 'pending'

  try {
    if (captureElement.value) {
      // 원본 스타일 저장
      const originalStyle = {
        width: captureElement.value.style.width,
        minWidth: captureElement.value.style.minWidth,
        maxWidth: captureElement.value.style.maxWidth,
        overflow: captureElement.value.style.overflow,
      }

      // 캡쳐용 고정 너비 적용
      captureElement.value.style.width = '1200px'
      captureElement.value.style.minWidth = '1200px'
      captureElement.value.style.maxWidth = '1200px'
      captureElement.value.style.overflow = 'visible'

      // 잠깐 기다려서 스타일 적용 완료
      await new Promise(resolve => setTimeout(resolve, 100))

      const blob = await htmlToImage.toBlob(captureElement.value, {
        quality: 1,
        pixelRatio: 2, // 더 선명한 이미지를 위해 2배 해상도
        skipAutoScale: true,
        backgroundColor: '#f8fafc', // 배경색 설정
      })

      // 원본 스타일 복원
      captureElement.value.style.width = originalStyle.width
      captureElement.value.style.minWidth = originalStyle.minWidth
      captureElement.value.style.maxWidth = originalStyle.maxWidth
      captureElement.value.style.overflow = originalStyle.overflow

      if (blob) {
        const item = new ClipboardItem({
          'image/png': blob,
        })

        await navigator.clipboard.write([item])
        copyStatus.value = 'success'

        setTimeout(() => {
          copyStatus.value = 'idle'
        }, 3000)
      }
    }
  }
  catch (error) {
    console.error('이미지 복사 실패:', error)
    copyStatus.value = 'error'

    // 오류 발생 시에도 스타일 복원
    if (captureElement.value) {
      captureElement.value.style.width = ''
      captureElement.value.style.minWidth = ''
      captureElement.value.style.maxWidth = ''
      captureElement.value.style.overflow = ''
    }

    setTimeout(() => {
      copyStatus.value = 'idle'
    }, 3000)
  }
}

const savePageAsImage = async () => {
  saveStatus.value = 'pending'

  try {
    if (captureElement.value && character.value) {
      // 원본 스타일 저장
      const originalStyle = {
        width: captureElement.value.style.width,
        minWidth: captureElement.value.style.minWidth,
        maxWidth: captureElement.value.style.maxWidth,
        overflow: captureElement.value.style.overflow,
      }

      // 캡쳐용 고정 너비 적용
      captureElement.value.style.width = '1200px'
      captureElement.value.style.minWidth = '1200px'
      captureElement.value.style.maxWidth = '1200px'
      captureElement.value.style.overflow = 'visible'

      // 잠깐 기다려서 스타일 적용 완료
      await new Promise(resolve => setTimeout(resolve, 100))

      const dataUrl = await htmlToImage.toPng(captureElement.value, {
        quality: 1,
        pixelRatio: 2, // 더 선명한 이미지를 위해 2배 해상도
        skipAutoScale: true,
        backgroundColor: '#f8fafc', // 배경색 설정
      })

      // 원본 스타일 복원
      captureElement.value.style.width = originalStyle.width
      captureElement.value.style.minWidth = originalStyle.minWidth
      captureElement.value.style.maxWidth = originalStyle.maxWidth
      captureElement.value.style.overflow = originalStyle.overflow

      if (dataUrl) {
        // 파일명 생성 (캐릭터명_날짜)
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
        const fileName = `${character.value.nickname}_${date}.png`

        // 다운로드 링크 생성
        const link = document.createElement('a')
        link.download = fileName
        link.href = dataUrl

        // 자동 다운로드 실행
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        saveStatus.value = 'success'

        setTimeout(() => {
          saveStatus.value = 'idle'
        }, 3000)
      }
    }
  }
  catch (error) {
    console.error('이미지 저장 실패:', error)
    saveStatus.value = 'error'

    // 오류 발생 시에도 스타일 복원
    if (captureElement.value) {
      captureElement.value.style.width = ''
      captureElement.value.style.minWidth = ''
      captureElement.value.style.maxWidth = ''
      captureElement.value.style.overflow = ''
    }

    setTimeout(() => {
      saveStatus.value = 'idle'
    }, 3000)
  }
}
</script>
