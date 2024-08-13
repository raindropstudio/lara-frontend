<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mt-20 flex items-center justify-center">
      <h1 class="bg-gradient-to-r from-lucidviolet-300 to-lucidviolet-800 bg-clip-text text-8xl font-bold text-transparent">
        {{ $route.params.nickname }}
      </h1>
    </div>
    <div
      ref="header"
      class="h-64"
    >
      <HTransitionRoot
        appear
        :show="status === 'pending'"
        class="delay-300"
        enter="transition-opacity duration-300 ease-in"
        enter-from="opacity-0"
        enter-to="opacity-100"
      >
        <CharacterLoading />
      </HTransitionRoot>
      <HTransitionRoot
        appear
        :show="status === 'error'"
        enter="transition-opacity duration-100 ease-in"
        enter-from="opacity-0"
        enter-to="opacity-100"
      >
        <CharacterError />
      </HTransitionRoot>
      <HTransitionRoot
        :show="status === 'success'"
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
      :show="status === 'success'"
      enter="transition-opacity duration-300 ease-in"
      enter-from="opacity-0"
      enter-to="opacity-100"
    >
      <div
        class="sticky top-4 mb-4"
      >
        <CharacterNav
          :character-image-url="character?.imageUrl"
          :show-image="!headerIsVisible"
          :updated-at="character?.updatedAt"
        />
      </div>
      <div class="h-[2000px]">
        test
      </div>
    </HTransitionRoot>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: `${route.params.nickname} | lara.moe`,
})

const { status, data: character } = await useLara<Character>(`character/${route.params.nickname}`)

const header = ref<HTMLElement | null>(null)
const headerIsVisible = useElementVisibility(header)
</script>
