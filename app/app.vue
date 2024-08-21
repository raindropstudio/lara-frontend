<template>
  <div class="min-h-screen bg-lucid-light selection:bg-amber-500/30 selection:text-amber-900">
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,#ffd688 0%,#ffb944 50%,#ffa220 100%)"
    />
    <div class="">
      <MainNav />
      <NuxtPage :keepalive="{ exclude: [], max: 10 }" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId())
</script>
