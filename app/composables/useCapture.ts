import * as htmlToImage from 'html-to-image'
import type { AsyncDataRequestStatus } from '#app'

interface CaptureOptions {
  elementRef: Ref<HTMLElement | null>
  filename?: MaybeRef<string>
  width?: number
  backgroundColor?: string
  pixelRatio?: number
  quality?: number
  header?: () => VNode | string
  footer?: () => VNode | string
}

interface OriginalStyles {
  overflow: string
}

export function useCapture(options: CaptureOptions) {
  const {
    elementRef,
    filename = 'capture.png',
    width = 1400,
    backgroundColor = '#f8fafc',
    pixelRatio = 2,
    quality = 1,
    header,
    footer,
  } = options

  const copyStatus = ref<AsyncDataRequestStatus>('idle')
  const saveStatus = ref<AsyncDataRequestStatus>('idle')

  const applyTemporaryStyles = (element: HTMLElement): OriginalStyles => {
    // 원본 스타일 저장
    const originalStyles: OriginalStyles = {
      overflow: element.style.overflow,
    }

    // 캡쳐용 고정 스타일 적용
    element.style.overflow = 'visible'

    return originalStyles
  }

  const restoreStyles = (element: HTMLElement, originalStyles: OriginalStyles) => {
    element.style.overflow = originalStyles.overflow
  }

  const wrapWithHeaderFooter = async (element: HTMLElement): Promise<HTMLElement> => {
    if (!header && !footer) {
      return element
    }

    // 래퍼 컨테이너 생성
    const wrapper = document.createElement('div')
    wrapper.style.position = 'fixed'
    wrapper.style.top = '-9999px'
    wrapper.style.left = '-9999px'
    wrapper.style.backgroundColor = backgroundColor
    wrapper.style.zIndex = '-1'

    // 헤더 추가
    if (header) {
      const headerElement = document.createElement('div')
      const headerContent = header()
      if (typeof headerContent === 'string') {
        headerElement.innerHTML = headerContent
      }
      else {
        headerElement.innerHTML = String(headerContent)
      }
      wrapper.appendChild(headerElement)
    }

    // 원본 요소의 클론 생성
    const clonedElement = element.cloneNode(true) as HTMLElement
    wrapper.appendChild(clonedElement)

    // 푸터 추가
    if (footer) {
      const footerElement = document.createElement('div')
      const footerContent = footer()
      if (typeof footerContent === 'string') {
        footerElement.innerHTML = footerContent
      }
      else {
        footerElement.innerHTML = String(footerContent)
      }
      wrapper.appendChild(footerElement)
    }

    // DOM에 추가
    document.body.appendChild(wrapper)

    // 스타일 로딩 대기
    await new Promise(resolve => setTimeout(resolve, 100))

    return wrapper
  }

  const removeWrapper = (wrapper: HTMLElement) => {
    if (wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper)
    }
  }

  const copyAsImage = async () => {
    if (!elementRef.value) {
      console.error('Element ref is not available')
      return
    }

    copyStatus.value = 'pending'

    let originalStyles: OriginalStyles | null = null
    let wrapper: HTMLElement | null = null

    try {
      // 스타일 임시 적용
      originalStyles = applyTemporaryStyles(elementRef.value)

      // 스타일 적용 대기
      await new Promise(resolve => setTimeout(resolve, 100))

      // 헤더/푸터가 있으면 래퍼 생성
      const captureTarget = header || footer
        ? await wrapWithHeaderFooter(elementRef.value)
        : elementRef.value

      if (captureTarget !== elementRef.value) {
        wrapper = captureTarget
      }

      const blob = await htmlToImage.toBlob(captureTarget, {
        quality,
        pixelRatio,
        width,
        skipAutoScale: true,
        backgroundColor,
      })

      if (blob) {
        const item = new ClipboardItem({
          'image/png': blob,
        })

        await navigator.clipboard.write([item])
        copyStatus.value = 'success'

        setTimeout(() => {
          copyStatus.value = 'idle'
        }, 3000)
      }
    }
    catch (error) {
      console.error('이미지 복사 실패:', error)
      copyStatus.value = 'error'

      setTimeout(() => {
        copyStatus.value = 'idle'
      }, 3000)
    }
    finally {
      // 정리 작업
      if (wrapper) {
        removeWrapper(wrapper)
      }
      if (originalStyles && elementRef.value) {
        restoreStyles(elementRef.value, originalStyles)
      }
    }
  }

  const saveAsImage = async () => {
    if (!elementRef.value) {
      console.error('Element ref is not available')
      return
    }

    saveStatus.value = 'pending'

    let originalStyles: OriginalStyles | null = null
    let wrapper: HTMLElement | null = null

    try {
      // 스타일 임시 적용
      originalStyles = applyTemporaryStyles(elementRef.value)

      // 스타일 적용 대기
      await new Promise(resolve => setTimeout(resolve, 100))

      // 헤더/푸터가 있으면 래퍼 생성
      const captureTarget = header || footer
        ? await wrapWithHeaderFooter(elementRef.value)
        : elementRef.value

      if (captureTarget !== elementRef.value) {
        wrapper = captureTarget
      }

      const dataUrl = await htmlToImage.toPng(captureTarget, {
        quality,
        pixelRatio,
        width,
        skipAutoScale: true,
        backgroundColor,
      })

      if (dataUrl) {
        // 다운로드 링크 생성
        const link = document.createElement('a')
        link.download = unref(filename)
        link.href = dataUrl

        // 자동 다운로드 실행
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        saveStatus.value = 'success'

        setTimeout(() => {
          saveStatus.value = 'idle'
        }, 3000)
      }
    }
    catch (error) {
      console.error('이미지 저장 실패:', error)
      saveStatus.value = 'error'

      setTimeout(() => {
        saveStatus.value = 'idle'
      }, 3000)
    }
    finally {
      // 정리 작업
      if (wrapper) {
        removeWrapper(wrapper)
      }
      if (originalStyles && elementRef.value) {
        restoreStyles(elementRef.value, originalStyles)
      }
    }
  }

  return {
    copyAsImage,
    saveAsImage,
    copyStatus: readonly(copyStatus),
    saveStatus: readonly(saveStatus),
  }
}
