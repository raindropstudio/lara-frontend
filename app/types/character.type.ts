import type { ItemEquipmentPreset } from './itemEquipment.type'
import type { Stat } from './stat.type'

export interface Character {
  nickname: string
  worldName: string
  gender: string
  class: string
  classLevel: string
  level: number
  exp: string
  expRate: number
  guildName: string
  imageUrl: string
  dateCreate: string
  accessFlag: boolean
  liberationQuestClear: boolean
  popularity: number
  updatedAt: string
  stat: Stat
  itemEquipmentPreset: ItemEquipmentPreset[]
}
