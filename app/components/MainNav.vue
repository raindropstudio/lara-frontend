<template>
  <nav>
    <div class="flex h-20 items-center justify-between gap-4 py-4">
      <div class="flex flex-1 items-center">
        <NuxtLink
          to="/"
          class="hover:drop-shadow-lg"
        >
          <img
            src="~/assets/spirit/ssun_logo.png"
            alt="lara logo"
            class="size-12"
          >
        </NuxtLink>
      </div>
      <div class="ml-6 flex gap-2 text-lg text-lucidviolet-700">
        <NuxtLink
          v-for="(link, idx) in links"
          :key="idx"
          :to="link.path"
          :class="getLinkClass(link.path) + ' rounded-lg p-2'"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
      <div class="flex flex-1 items-center justify-end">
        <button
          class="group flex h-8 w-64 items-center gap-3 rounded-md border-2 border-lucidviolet-400 bg-transparent px-2 text-left text-lucidviolet-400 hover:border-sunnyorange hover:text-lucidviolet-700"
          @click="onSearch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="size-5 group-hover:text-sunnyorange"
          ><path
            fill="currentColor"
            d="M456.69 421.39L362.6 327.3a173.8 173.8 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.8 173.8 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8"
          /></svg>
          <div class="flex flex-1 cursor-text items-center gap-1">
            <span class="inline-flex h-4 min-w-4 items-center justify-center rounded bg-gray-100 px-1 text-xs font-medium ring-1 ring-inset ring-lucidviolet-300">
              /
            </span>
            <span>
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
  { name: '파티검색', path: '/', disabled: true },
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
