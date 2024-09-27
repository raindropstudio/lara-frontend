<template>
  <div>
    <div class="relative flex flex-col items-center justify-center">
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
          class="sticky top-4 z-10"
        >
          <CharacterNav
            :character-image-url="character?.imageUrl"
            :show-image="!headerIsVisible"
            :updated-at="character?.updatedAt"
            :update-status="updateStatus"
            :current-section="headerIsVisible ? '' : currentSection"
            @refresh="updateCharacter"
          />
        </div>
        <div
          id="summary"
          ref="summary"
          class="w-full max-w-screen-xl px-4 py-12"
        >
          <CharacterSummary
            :character="character"
          />
        </div>
        <div
          id="equipment"
          ref="equipment"
          class="w-full bg-white"
        >
          <div class="mx-auto max-w-screen-xl">
            <CharacterEquipment
              :character="character"
            />
          </div>
        </div>
        <div
          id="skill"
          ref="skill"
          class="h-[1000px] w-full py-24"
        >
          스킬
        </div>
        <div
          id="stat"
          ref="stat"
          class="h-[500px] w-full bg-white py-24"
        >
          스텟
        </div>
        <div
          id="union"
          ref="union"
          class="h-[1000px] w-full py-24"
        >
          유니온
        </div>
      </HTransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>
