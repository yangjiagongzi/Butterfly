import { AttackType, RequestMeth } from '~/constant/intruder'
import {
  ATTACK_TYPE_UPDATE_KEY,
  METHOD_UPDATE_KEY,
  HEADERS_UPDATE_KEY,
  PARAMS_UPDATE_KEY
} from '~/renderer/action/intruder'

export type HeaderParamsItem = {
  id: string
  key: string
  value: string
  enable: boolean
}

export type IntruderOptions = {
  attackType: Values<typeof AttackType>['id']
  method: Values<typeof RequestMeth>
  headers: HeaderParamsItem[]
  params: HeaderParamsItem[]
}

export interface ATTACK_TYPE_UPDATE {
  type: typeof ATTACK_TYPE_UPDATE_KEY
  attackType: Values<typeof AttackType>['id']
}

export interface METHOD_UPDATE {
  type: typeof METHOD_UPDATE_KEY
  method: Values<typeof RequestMeth>
}

export interface HEADERS_UPDATE {
  type: typeof HEADERS_UPDATE_KEY
  headers: HeaderParamsItem[]
}

export interface PARAMS_UPDATE {
  type: typeof PARAMS_UPDATE_KEY
  params: HeaderParamsItem[]
}

export type IntruderAction = ATTACK_TYPE_UPDATE | METHOD_UPDATE | HEADERS_UPDATE | PARAMS_UPDATE
