import { AttackType, RequestMeth } from '~/constant/intruder'
import { ATTACK_TYPE_UPDATE_KEY, METHOD_UPDATE_KEY } from '~/renderer/action/intruder'

export type IntruderOptions = {
  attackType: Values<typeof AttackType>
  method: Values<typeof RequestMeth>
}

export interface ATTACK_TYPE_UPDATE {
  type: typeof ATTACK_TYPE_UPDATE_KEY
  attackType: Values<typeof AttackType>
}

export interface METHOD_UPDATE {
  type: typeof METHOD_UPDATE_KEY
  method: Values<typeof RequestMeth>
}

export type IntruderAction = ATTACK_TYPE_UPDATE | METHOD_UPDATE
