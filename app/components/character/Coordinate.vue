<template>
  <div>
    <div class="flex flex-col py-8">
      <div class="text-8xl font-black text-lucidgray-light">
        Coordinate
      </div>
      <div class="my-12 flex items-center justify-around">
        <div class="mb-4 text-left text-6xl font-black text-lucidgray-light">
          성능
        </div>
        <div class="mb-4 text-6xl font-black text-lucidgray-light">
          외형
        </div>
      </div>
      <div class="my-12 flex items-center justify-around">
        <div class="mb-4 text-6xl font-black text-lucidgray-light">
          안드로이드
        </div>
        <div class="mb-4 text-6xl font-black text-lucidgray-light">
          펫
          <span class="font-normal">⋅</span>
          장비
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  character: Character | undefined
}>()

const character = toRef(props, 'character')
</script>
