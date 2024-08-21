<template>
  <div>
    <section class="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
      <div class="flex w-full flex-1 flex-col items-center justify-center">
        <div class="my-2 flex flex-col items-center justify-center">
          <h1 class="font-['lato'] text-9xl font-thin tracking-widest text-amber-500">
            lara.moe
          </h1>
          <h2 class="text-xl tracking-[0.45rem] text-lucidviolet-800">
            메이플스토리 종합 데이터분석 서비스
            <span class="text-amber-500">라라모에</span>
          </h2>
        </div>
        <div class="my-4 flex w-full items-center justify-center">
          <button class="h-12 w-full max-w-5xl rounded-xl border-2 border-sunnyorange">
            검색
          </button>
        </div>
      </div>
      <div class="my-auto flex h-20 items-center justify-center">
        <div class="relative">
          <div class="absolute h-[29px] w-[7px] rounded-[15px] bg-lucidviolet-200" />
          <div class="absolute h-[15px] w-[7px] rounded-[15px] bg-sunnyorange/70" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'lara.moe',
})
</script>
