import { AttackType, RequestMeth } from '~/constant/intruder'
import { Dispatch, GetState } from '~/type/redux'
import { ATTACK_TYPE_UPDATE, METHOD_UPDATE } from '~/type/redux/intruder'

export const ATTACK_TYPE_UPDATE_KEY = 'ATTACKTYPE/UPDATE'
export const METHOD_UPDATE_KEY = 'METHOD/UPDATE'

function updateAttackType(type: Values<typeof AttackType>): ATTACK_TYPE_UPDATE {
  return {
    type: ATTACK_TYPE_UPDATE_KEY,
    attackType: type
  }
}

function updateMethod(method: Values<typeof RequestMeth>): METHOD_UPDATE {
  return {
    type: METHOD_UPDATE_KEY,
    method: method
  }
}

class IntruderReduxAction {
  updateAttackType = (type: Values<typeof AttackType>) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateAttackType(type))
    }
  }

  updateMethod = (method: Values<typeof RequestMeth>) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateMethod(method))
    }
  }
}

export default new IntruderReduxAction()
