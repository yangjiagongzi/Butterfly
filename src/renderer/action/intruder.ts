import { AttackType, RequestMeth } from '~/constant/intruder'
import { Dispatch, GetState } from '~/type/redux'
import {
  HeaderParamsItem,
  ATTACK_TYPE_UPDATE,
  METHOD_UPDATE,
  HEADERS_UPDATE,
  PARAMS_UPDATE
} from '~/type/redux/intruder'

export const ATTACK_TYPE_UPDATE_KEY = 'ATTACKTYPE/UPDATE'
export const METHOD_UPDATE_KEY = 'METHOD/UPDATE'
export const HEADERS_UPDATE_KEY = 'HEADERS/UPDATE'
export const PARAMS_UPDATE_KEY = 'PARAMS/UPDATE'

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

function updateHeaders(headers: HeaderParamsItem[]): HEADERS_UPDATE {
  return {
    type: HEADERS_UPDATE_KEY,
    headers: headers
  }
}

function updateParams(params: HeaderParamsItem[]): PARAMS_UPDATE {
  return {
    type: PARAMS_UPDATE_KEY,
    params: params
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

  updateHeaders = (idx: number, value: HeaderParamsItem) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const headers = intruderOptions.headers
      const newHeaders = headers.map((item, i) => (i === idx ? value : item))
      const hasEmpty = newHeaders.some(item => !item.key && !item.value)
      if (!hasEmpty) {
        newHeaders.push({ key: '', value: '', enable: true })
      }
      dispatch(updateHeaders(newHeaders))
    }
  }

  deleteHeadersItem = (idx: number) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const headers = intruderOptions.headers
      const newHeaders = headers.filter((item, i) => i != idx)
      dispatch(updateHeaders(newHeaders))
    }
  }

  updateParams = (idx: number, value: HeaderParamsItem) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const params = intruderOptions.params
      const newParams = params.map((item, i) => (i === idx ? value : item))
      const hasEmpty = newParams.some(item => !item.key && !item.value)
      if (!hasEmpty) {
        newParams.push({ key: '', value: '', enable: true })
      }
      dispatch(updateParams(newParams))
    }
  }

  deleteParamsItem = (idx: number) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const params = intruderOptions.params
      const newParams = params.filter((item, i) => i != idx)
      dispatch(updateParams(newParams))
    }
  }
}

export default new IntruderReduxAction()
