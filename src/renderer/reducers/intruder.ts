import { IntruderOptionsDefaultValue } from '~/constant/intruder'
import { Action } from '~/type/redux'
import { IntruderOptions } from '~/type/redux/intruder'
import { ATTACK_TYPE_UPDATE_KEY, METHOD_UPDATE_KEY, HEADER_UPDATE_KEY } from '../action/intruder'

export function intruderOptions(
  state: IntruderOptions = IntruderOptionsDefaultValue,
  action: Action
) {
  switch (action.type) {
    case ATTACK_TYPE_UPDATE_KEY:
      return { ...state, attackType: action.attackType }
    case METHOD_UPDATE_KEY:
      return { ...state, method: action.method }
    case HEADER_UPDATE_KEY:
      return { ...state, header: action.header }
    default:
      return state
  }
}
