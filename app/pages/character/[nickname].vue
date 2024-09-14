<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <div class="mt-20 flex items-center justify-center">
        <h1
          class="bg-gradient-to-r from-lucidviolet-300 to-lucidviolet-800 bg-clip-text text-8xl font-bold text-transparent"
          @click="initStatus === 'error'
            ? navigateTo(`/character?input=${$route.params.nickname}`)
            : ''
          "
        >
          {{ $route.params.nickname }}
        </h1>
      </div>
      <div
        ref="header"
        class="h-64 w-full"
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
          class="sticky top-4"
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
          class="h-[500px] w-full bg-white py-24"
        >
          장비
        </div>
        <div
          id="hexa"
          ref="hexa"
          class="h-[1000px] w-full py-24"
        >
          헥사
        </div>
        <div
          id="stat"
          ref="stat"
          class="h-[500px] w-full bg-white py-24"
        >
          스텟
        </div>
      </HTransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'

const route = useRoute()

useHead({
  title: `${route.params.nickname} | lara.moe`,
})

const header = ref<HTMLElement | null>(null)
const headerIsVisible = useElementVisibility(header)

const { status: initStatus, data: character } = useLara<Character>(`character/${route.params.nickname}`)
const updateStatus = ref<AsyncDataRequestStatus>('idle')

const updateCharacter = async () => {
  updateStatus.value = 'pending'
  const { status, data: updatedCharacter } = await useLara<Character>(`character/${route.params.nickname}`, {
    params: {
      update: true,
    },
  })
  updateStatus.value = status.value
  if (status.value === 'success') {
    character.value = updatedCharacter.value
  }
}

const currentSection = ref('')
const summary = ref<HTMLElement | null>(null)
const equipment = ref<HTMLElement | null>(null)
const hexa = ref<HTMLElement | null>(null)
const stat = ref<HTMLElement | null>(null)

const sections = [
  { key: 'summary', ref: summary },
  { key: 'equipment', ref: equipment },
  { key: 'hexa', ref: hexa },
  { key: 'stat', ref: stat },
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
