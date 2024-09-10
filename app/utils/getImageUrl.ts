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
