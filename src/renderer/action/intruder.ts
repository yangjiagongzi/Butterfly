import { AttackType, RequestMeth } from '~/constant/intruder'
import { Dispatch, GetState } from '~/type/redux'
import {
  HeaderParamsItem,
  ATTACK_TYPE_UPDATE,
  METHOD_UPDATE,
  HEADER_UPDATE
} from '~/type/redux/intruder'

export const ATTACK_TYPE_UPDATE_KEY = 'ATTACKTYPE/UPDATE'
export const METHOD_UPDATE_KEY = 'METHOD/UPDATE'
export const HEADER_UPDATE_KEY = 'HEADER/UPDATE'

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

function updateHeader(header: HeaderParamsItem[]): HEADER_UPDATE {
  return {
    type: HEADER_UPDATE_KEY,
    header: header
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

  updateHeader = (idx: number, value: HeaderParamsItem) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const header = intruderOptions.header
      const newHeader = header.map((item, i) => (i === idx ? value : item))
      const hasEmpty = newHeader.some(item => !item.key && !item.value)
      if (!hasEmpty) {
        newHeader.push({ key: '', value: '', enable: true })
      }
      dispatch(updateHeader(newHeader))
    }
  }

  deleteHeaderItem = (idx: number) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const header = intruderOptions.header
      const newHeader = header.filter((item, i) => i != idx)
      dispatch(updateHeader(newHeader))
    }
  }
}

export default new IntruderReduxAction()
