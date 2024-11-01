<template>
  <div
    ref="popupRef"
    class="relative inline-block"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <!-- 첫 번째 팝업 -->
    <div
      v-if="visible && setEffect"
      ref="popupFloating"
      :style="floatingStyles"
      :class="styles.popupContainer"
    >
      <div :class="styles.popupTitle">
        {{ setEffect.setName }}
      </div>
      <div :class="styles.popupSubtitle">
        {{ setEffect.setCount }}세트 효과 적용 중
      </div>
      <hr class="my-2 border-t border-dashed border-gray-200">
      <div class="divide-y divide-dashed divide-gray-200">
        <div
          v-for="option in firstPopupOptions"
          :key="option.setCount"
          class="py-2 first:pt-0 last:pb-0"
        >
          <div
            :class="[
              styles.setCountBase,
              { [styles.setCountActive]: option.setCount <= setEffect.setCount },
            ]"
          >
            {{ option.setCount }}세트 효과
          </div>
          <div
            :class="[
              styles.setOptionBase,
              { [styles.setOptionActive.first]: option.setCount <= setEffect.setCount },
            ]"
          >
            {{ parseSetOption(option.setOption) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 두 번째 팝업 -->
    <div
      v-if="visible && setEffect && secondPopupOptions.length > 0"
      ref="secondPopupFloating"
      :style="secondFloatingStyles"
      :class="styles.popupContainer"
    >
      <div class="divide-y divide-dashed divide-gray-200">
        <div
          v-for="option in secondPopupOptions"
          :key="option.setCount"
          class="py-2 first:pt-0 last:pb-0"
        >
          <div
            :class="[
              styles.setCountBase,
              { [styles.setCountActive]: option.setCount <= setEffect.setCount },
            ]"
          >
            {{ option.setCount }}세트 효과
          </div>
          <div
            :class="[
              styles.setOptionBase,
              { [styles.setOptionActive.first]: option.setCount <= setEffect.setCount },
            ]"
          >
            {{ parseSetOption(option.setOption) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { autoUpdate, limitShift, offset, shift } from '@floating-ui/dom'
import { useFloating } from '@floating-ui/vue'
import { computed, ref } from 'vue'
import type { SetEffect } from '~/types/setEffect.type'

const props = defineProps<{
  setEffect: SetEffect
  mainStatName: string
  atkStat: string
}>()

const visible = ref(false)
const popupRef = ref<HTMLElement>()
const popupFloating = ref<HTMLElement>()
const secondPopupFloating = ref<HTMLElement>()

// 공통 스타일 클래스
const styles = {
  popupContainer: 'pointer-events-none absolute left-0 top-0 z-30 w-64 rounded-md bg-white/50 p-2 text-xs font-light text-lucidviolet-900 ring-2 ring-lucidgray-light backdrop-blur-2xl',
  popupTitle: 'py-1 text-center text-lg font-bold',
  popupSubtitle: '-mt-2 text-center text-sm text-lucidviolet-800',
  setCountBase: 'text-xs font-medium text-lucidviolet-500',
  setCountActive: 'text-base font-semibold text-lucidviolet-900',
  setOptionBase: 'whitespace-pre-line text-xs text-lucidviolet-400',
  setOptionActive: {
    first: 'text-sm text-lucidviolet-700 font-semibold',
  },
}

// 첫 번째 팝업 위치 설정
const { floatingStyles } = useFloating(popupRef, popupFloating, {
  whileElementsMounted: autoUpdate,
  placement: 'right-start',
  middleware: [offset(10), shift({
    crossAxis: true,
    limiter: limitShift(),
  })],
})

// 두 번째 팝업 위치 설정
const { floatingStyles: secondFloatingStyles } = useFloating(popupFloating, secondPopupFloating, {
  whileElementsMounted: autoUpdate,
  placement: 'right-start',
  middleware: [offset(10), shift({
    crossAxis: true,
    limiter: limitShift(),
  })],
})

// 첫 번째 팝업에 표시할 옵션 (첫 5개)
const firstPopupOptions = computed(() => {
  const options = props.setEffect?.setOptionList ?? []
  const parsedOptions = options.filter((option) => {
    const optionText = parseSetOption(option.setOption)
    return optionText.trim() !== '' // 빈 자열이 아닌 옵션만 포함
  })
  return parsedOptions.slice(0, 5)
})

// 두 번째 팝업에 표시할 옵션 (6번째부터)
const secondPopupOptions = computed(() => {
  const options = props.setEffect?.setOptionList ?? []
  const parsedOptions = options.filter((option) => {
    const optionText = parseSetOption(option.setOption)
    return optionText.trim() !== '' // 빈 문자열이 아닌 옵션만 포함
  })
  return parsedOptions.slice(5)
})

const parseSetOption = (setOption: string): string => {
  const options = setOption.split(',').map(option => option.trim())
  let parsedOptions = [...options]

  // 공격력과 마력 값 찾기
  const atkValue = options.find(opt => opt.includes('공격력'))?.match(/\d+/)?.[0]
  const magValue = options.find(opt => opt.includes('마력'))?.match(/\d+/)?.[0]

  // 공격력과 마력이 동일한 값이면 합치기
  if (atkValue && magValue && atkValue === magValue) {
    parsedOptions = parsedOptions
      .filter(opt => !opt.includes('공격력') && !opt.includes('마력'))
      .concat(`공격력/마력 : +${atkValue}`)
  }

  // HP와 MP 값 찾기
  const hpValue = options.find(opt => opt.includes('최대 HP'))?.match(/\d+/)?.[0]
  const mpValue = options.find(opt => opt.includes('최대 MP'))?.match(/\d+/)?.[0]

  // HP와 MP가 동일한 값이면 합치기
  if (hpValue && mpValue && hpValue === mpValue) {
    parsedOptions = parsedOptions
      .filter(opt => !opt.includes('최대 HP') && !opt.includes('최대 MP'))
      .concat(`HP/MP : +${hpValue}`)
  }

  return parsedOptions.join('\n')
}
</script>
