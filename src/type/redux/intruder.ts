import { AttackType, RequestMeth } from '~/constant/intruder'
import {
  ATTACK_TYPE_UPDATE_KEY,
  METHOD_UPDATE_KEY,
  HEADER_UPDATE_KEY
} from '~/renderer/action/intruder'

export type HeaderParamsItem = {
  key: string
  value: string
  enable: boolean
}

export type IntruderOptions = {
  attackType: Values<typeof AttackType>
  method: Values<typeof RequestMeth>
  header: HeaderParamsItem[]
}

export interface ATTACK_TYPE_UPDATE {
  type: typeof ATTACK_TYPE_UPDATE_KEY
  attackType: Values<typeof AttackType>
}

export interface METHOD_UPDATE {
  type: typeof METHOD_UPDATE_KEY
  method: Values<typeof RequestMeth>
}

export interface HEADER_UPDATE {
  type: typeof HEADER_UPDATE_KEY
  header: HeaderParamsItem[]
}

export type IntruderAction = ATTACK_TYPE_UPDATE | METHOD_UPDATE | HEADER_UPDATE
