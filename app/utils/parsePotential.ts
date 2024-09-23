export const parsePotential = (potential: string, start: string, end?: string) => {
  if (potential.startsWith(start) && (!end || potential.endsWith(end))) {
    // end로 끝나는 경우 (예: %)
    if (end) return parseFloat(potential.split('+')[1]?.split(end)[0] ?? '0')
    // 숫자로 끝나는 경우
    if (!isNaN(+potential.trim().slice(-1))) return parseFloat(potential.split('+')[1] ?? '0')
  }
  return 0
}
