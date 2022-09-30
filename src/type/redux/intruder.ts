import { AttackType } from '~/constant/intruder'
import { ATTACK_TYPE_UPDATE_KEY } from '~/renderer/action/intruder'

export type IntruderOptions = {
  attackType: Values<typeof AttackType>
}

export interface ATTACK_TYPE_UPDATE {
  type: typeof ATTACK_TYPE_UPDATE_KEY
  attackType: Values<typeof AttackType>
}

export type IntruderAction = ATTACK_TYPE_UPDATE
