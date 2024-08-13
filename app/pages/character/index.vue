<template>
  <div>
    <div class="mt-[70px] flex items-center justify-center">
      <div class="w-16" />
      <input
        ref="input"
        placeholder=""
        type="text"
        class="max-w-[600px] border-b-2 border-lucidviolet-300 bg-gradient-to-r from-lucidviolet-300 to-lucidviolet-800 bg-clip-text text-center text-8xl font-bold text-transparent caret-sunnyorange placeholder:text-lucidviolet-300 focus:ring-0"
        @keyup.enter="onSearch"
      >
      <button
        class="rounded-lg py-2 text-lucidviolet-400 hover:bg-lucidviolet-50 hover:text-sunnyorange"
        @click="onSearch"
      >
        <IconSearch class="size-16" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createTypeStream, delay } from 'hangul-typing-animation'

useSeoMeta({
  title: '캐릭터검색 | lara.moe',
})

const input = ref<HTMLInputElement | null>(null)

const typeStream = createTypeStream({
  perChar: 100,
  perHangul: 200,
  perSpace: 50,
  perLine: 0,
  perDot: 150,
})

const deleteStream = async (text: string, callback: (typing: string) => void) => {
  for (let i = text.length; i >= 0; i--) {
    await delay(150)
    callback(text.slice(0, i))
  }
}

const placeholderMessages = [
  '캐릭터명입력',
  '라라모에',
  '소주에보드카',
  '섭주',
  '비숍화이팅!!',
  '메이플화이팅',
  '신.창.섭.',
  '앙헤카톤의주',
  '녜힁',
  '뾃뜚땵꺓뛞쫤',
  '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
]

const typeAnimation = async () => {
  for (const message of placeholderMessages) {
    await delay(500)
    await typeStream(message, async (typing) => {
      if (input.value) input.value.placeholder = typing
    })
    await delay(500)
    await deleteStream(message, async (typing) => {
      if (input.value) input.value!.placeholder = typing
    })
  }
}

const onSearch = () => {
  navigateTo(`/character/${input.value?.value}`)
}

onMounted(() => {
  typeAnimation()
})

onActivated(async () => {
  if (input.value) {
    input.value.value = ''
    input.value.focus()
  }
})
</script>
