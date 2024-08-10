<template>
  <div class="min-h-screen bg-lucid-50 selection:bg-amber-500/30 selection:text-amber-900">
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,#ffd688 0%,#ffb944 50%,#ffa220 100%)"
    />
    <div class="container mx-auto">
      <MainNav />
      <NuxtPage :keepalive="{ exclude: [], max: 10 }" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
