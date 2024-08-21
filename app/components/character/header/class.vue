<template>
  <div class="font-extrabold text-sunnyorange">
    {{ character?.class }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  character: Character | undefined
}>()

const { character } = toRefs(props)
</script>
