export const findMainStat = (character?: Character) => {
  if (!character || !character?.stat) return null

  // AP를 투자한 스탯 기준으로 주스탯 추정
  const stat = {
    str: character.stat.apStr || 0,
    dex: character.stat.apDex || 0,
    int: character.stat.apInt || 0,
    luk: character.stat.apLuk || 0,
    hp: character.stat.apHp || 0,
  }

  // 힘덱럭 다 높으면 제논
  if (stat.str > 4 && stat.dex > 4 && stat.luk > 4) return 'mix'

  // 데벤포함 5개중 높은거
  return (Object.keys(stat) as (keyof typeof stat)[])
    .reduce((a, b) => stat[a] > stat[b] ? a : b)
}
