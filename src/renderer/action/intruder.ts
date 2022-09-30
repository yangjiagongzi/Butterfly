import { AttackType } from '~/constant/intruder'
import { Dispatch, GetState } from '~/type/redux'
import { ATTACK_TYPE_UPDATE } from '~/type/redux/intruder'

export const ATTACK_TYPE_UPDATE_KEY = 'ATTACKTYPE/UPDATE'

function updateAttackType(type: Values<typeof AttackType>): ATTACK_TYPE_UPDATE {
  return {
    type: ATTACK_TYPE_UPDATE_KEY,
    attackType: type
  }
}

class IntruderReduxAction {
  updateAttackType = (type: Values<typeof AttackType>) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateAttackType(type))
    }
  }
}

export default new IntruderReduxAction()
