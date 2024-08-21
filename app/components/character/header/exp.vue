<template>
  <div class=" bg-gradient-to-r from-lucid-light to-lucidviolet-500 to-10% bg-clip-text font-thin text-transparent">
    <span>#</span>
    <UiTooltip>
      <span class="inline-block cursor-help text-lucidviolet-500">
        나무의 수보다 많은 경험
      </span>
      <template #tooltip>
        <div>
          누적 경험치: {{ characterExpText }}
        </div>
      </template>
    </UiTooltip>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  character: Character | undefined
}>()

const { character } = toRefs(props)

const characterExpText = computed(() => {
  if (!character.value) return 0
  // 먼 미래에 safeint 벗어나면 bigint로 바꾸기
  return formatToKoreanNumber(parseInt(character.value.exp))
})
</script>
