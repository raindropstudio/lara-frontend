<template>
  <nav>
    <div class="mx-auto flex h-20 max-w-screen-xl items-center justify-between gap-4 p-4">
      <div class="flex flex-1 items-center">
        <NuxtLink
          to="/"
          class="hover:drop-shadow-lg"
        >
          <img
            src="~/assets/spirit/ssun_logo.webp"
            alt="lara logo"
            class="size-12"
          >
        </NuxtLink>
      </div>
      <HPopover class="relative sm:hidden">
        <HPopoverButton class="flex items-center px-2 text-lg text-lucidviolet-700">
          <span class="ml-6">
            {{ currentTitle }}
          </span>
          <div class="text-lucidviolet-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="size-6"
            ><path
              fill="currentColor"
              d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"
            /></svg>
          </div>
        </HPopoverButton>
        <HPopoverPanel class="absolute -left-10 z-50 mt-2 w-48 divide-y divide-lucidviolet-200 rounded-lg bg-white text-center shadow-lg ring-1 ring-lucidviolet-200">
          <NuxtLink
            v-for="(link, idx) in links"
            :key="idx"
            :to="link.path"
            :class="getLinkClass(link.path) + ' block px-4 py-2 text-lg hover:bg-lucidviolet-50'"
          >
            {{ link.name }}
          </NuxtLink>
        </HPopoverPanel>
      </HPopover>
      <div class="hidden sm:block">
        <div class="flex gap-2 text-lg text-lucidviolet-700">
          <NuxtLink
            v-for="(link, idx) in links"
            :key="idx"
            :to="link.disabled ? '' : link.path"
            :class="getLinkClass(link.path) + ' rounded-lg p-2'"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-end gap-4">
        <button
          class="group flex h-8 w-10 items-center gap-3 rounded-md border-lucidviolet-400 bg-transparent px-2 text-left text-lucidviolet-400 hover:border-sunnyorange hover:text-lucidviolet-700 sm:w-16 sm:border-2 lg:w-64"
          @click="onSearch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="size-8 group-hover:text-sunnyorange sm:size-5"
          ><path
            fill="currentColor"
            d="M456.69 421.39L362.6 327.3a173.8 173.8 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.8 173.8 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8"
          /></svg>
          <div class="hidden flex-1 cursor-text items-center gap-1 sm:flex">
            <span class="inline-flex h-4 min-w-4 items-center justify-center rounded bg-gray-100 px-1 text-xs font-medium ring-1 ring-inset ring-lucidviolet-300">
              /
            </span>
            <span class="hidden lg:block">
              를 눌러 바로 검색
            </span>
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute()

const links = [
  { name: '캐릭터', path: '/character' },
  { name: '군장검사', path: '/', disabled: true },
  { name: '맞짱', path: '/', disabled: true },
  { name: '코디', path: '/', disabled: true },
  { name: '지표', path: '/', disabled: true },
  { name: '도구', path: '/', disabled: true },
]

const getLinkClass = (linkPath: string) => {
  return links.find(link => link.path === linkPath)?.disabled
    ? 'cursor-not-allowed text-lucidviolet-300'
    : route.path.startsWith(linkPath)
      ? 'text-amber-500 hover:text-amber-600 hover:bg-lucidviolet-50'
      : 'text-lucidviolet-700 hover:text-amber-600 hover:bg-lucidviolet-50'
}

const currentTitle = computed(() => {
  if (route.path === '/') return '메뉴'
  return links.find(link => route.path.startsWith(link.path))?.name
})

const onSearch = () => {
  console.log('search')
}

const handleSlash = (e: KeyboardEvent) => {
  if (e.key === '/') {
    e.preventDefault()
    onSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleSlash)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleSlash)
})
</script>
