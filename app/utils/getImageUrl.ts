export const getLargeCharacterImageUrl = (characterImageCode: string | undefined) => {
  if (!characterImageCode) return ''
  return 'https://open.api.nexon.com/static/maplestory/Character/180/' + characterImageCode + '.png'
}

export const getCharacterImageUrl = (characterImageCode: string | undefined) => {
  if (!characterImageCode) return ''
  return 'https://open.api.nexon.com/static/maplestory/Character/' + characterImageCode + '.png'
}

export const getItemImageUrl = (itemImageCode: string | undefined) => {
  if (!itemImageCode) return ''
  return 'https://open.api.nexon.com/static/maplestory/ItemIcon/' + itemImageCode + '.png'
}

export const getSkillImageUrl = (skillImageCode: string | undefined) => {
  if (!skillImageCode) return ''
  return 'https://open.api.nexon.com/static/maplestory/SkillIcon/' + skillImageCode + '.png'
}

export const getSymbolImageUrl = async (symbolName: string | undefined) => {
  if (!symbolName) return ''

  const symbolImages: { [key: string]: () => Promise<typeof import('*.png')> } = {
    '아케인심볼': () => import('~/assets/symbol/arc.png'),
    '아케인심볼 : 소멸의 여로': () => import('~/assets/symbol/arc-1.png'),
    '아케인심볼 : 츄츄 아일랜드': () => import('~/assets/symbol/arc-2.png'),
    '아케인심볼 : 레헬른': () => import('~/assets/symbol/arc-3.png'),
    '아케인심볼 : 아르카나': () => import('~/assets/symbol/arc-4.png'),
    '아케인심볼 : 모라스': () => import('~/assets/symbol/arc-5.png'),
    '아케인심볼 : 에스페라': () => import('~/assets/symbol/arc-6.png'),
    '어센틱심볼 : 세르니움': () => import('~/assets/symbol/aut-1.png'),
    '어센틱심볼 : 아르크스': () => import('~/assets/symbol/aut-2.png'),
    '어센틱심볼 : 오디움': () => import('~/assets/symbol/aut-3.png'),
    '어센틱심볼 : 도원경': () => import('~/assets/symbol/aut-4.png'),
    '어센틱심볼 : 아르테리아': () => import('~/assets/symbol/aut-5.png'),
    '어센틱심볼 : 카르시온': () => import('~/assets/symbol/aut-6.png'),
    '그랜드 어센틱심볼 : 탈라하트': () => import('~/assets/symbol/grandaut-1.png'),
  }

  if (!symbolImages[symbolName]) return ''

  const image = await symbolImages[symbolName]()
  return image.default
}
