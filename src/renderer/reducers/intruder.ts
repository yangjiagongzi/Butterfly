import { IntruderOptionsDefaultValue } from '~/constant/intruder'
import { Action } from '~/type/redux'
import { IntruderOptions } from '~/type/redux/intruder'
import { ATTACK_TYPE_UPDATE_KEY } from '../action/intruder'

export function intruderOptions(
  state: IntruderOptions = IntruderOptionsDefaultValue,
  action: Action
) {
  switch (action.type) {
    case ATTACK_TYPE_UPDATE_KEY:
      return { ...state, attackType: action.attackType }
    default:
      return state
  }
}
