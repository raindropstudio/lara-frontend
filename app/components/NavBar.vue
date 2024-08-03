<template>
  <div class="container mx-auto">
    <div class="flex items-center gap-4 py-4">
      <div>
        <NuxtLink
          to="/"
          class="hover:drop-shadow-lg"
        >
          <img
            src="~/assets/spirit/sun-spirit-l.png"
            alt="lara logo"
            class="size-12"
          >
        </NuxtLink>
      </div>
      <div class="ml-6 flex gap-4 text-lg">
        <NuxtLink to="/">
          홈
        </NuxtLink>
        <NuxtLink to="/character">
          캐릭터
        </NuxtLink>
        <NuxtLink to="/">
          VS
        </NuxtLink>
        <NuxtLink to="/">
          코디
        </NuxtLink>
        <NuxtLink to="/">
          지표
        </NuxtLink>
        <NuxtLink to="/">
          도구
        </NuxtLink>
      </div>
      <div class="ml-auto">
        <input
          type="text"
          class="h-8 w-64 rounded-md p-2 ring-2 ring-sunnyorange"
          placeholder="[/]를 눌러 바로검색"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
