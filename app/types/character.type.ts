import type { CashEquipmentPreset } from './cashEquipment.type'
import type { ItemEquipmentPreset } from './itemEquipment.type'
import type { PetEquipment } from './petEquipment.type'
import type { SetEffect } from './setEffect.type'
import type { Stat } from './stat.type'
import type { Symbol } from './symbol.type'
import type { Union } from './union.type'

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
  cashEquipmentPreset: CashEquipmentPreset[]
  setEffect: SetEffect[]
  petEquipment: PetEquipment[]
  symbol: Symbol[]
  union?: Union
}
