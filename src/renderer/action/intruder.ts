import { AttackType, RequestMeth } from '~/constant/intruder'
import { Dispatch, GetState } from '~/type/redux'
import {
  ATTACK_TYPE_UPDATE,
  HeaderParamsItem,
  HEADERS_UPDATE,
  METHOD_UPDATE,
  PARAMS_UPDATE,
  SETTINGS_UPDATE,
  SettingsParams
} from '~/type/redux/intruder'
import uuid from '~/utils/UuidUtil'

export const ATTACK_TYPE_UPDATE_KEY = 'ATTACKTYPE/UPDATE'
export const METHOD_UPDATE_KEY = 'METHOD/UPDATE'
export const HEADERS_UPDATE_KEY = 'HEADERS/UPDATE'
export const PARAMS_UPDATE_KEY = 'PARAMS/UPDATE'
export const SETTINGS_UPDATE_KEY = 'SETTINGS/UPDATE'

function updateAttackType(type: Values<typeof AttackType>['id']): ATTACK_TYPE_UPDATE {
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

function updateSettings(settings: SettingsParams): SETTINGS_UPDATE {
  return {
    type: SETTINGS_UPDATE_KEY,
    params: settings
  }
}

class IntruderReduxAction {
  updateAttackType = (type: Values<typeof AttackType>['id']) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateAttackType(type))
    }
  }

  updateMethod = (method: Values<typeof RequestMeth>) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateMethod(method))
    }
  }

  updateHeaders = (id: string, value: HeaderParamsItem) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const headers = intruderOptions.headers
      const newHeaders = headers.map(item => (item.id === id ? value : item))
      const hasEmpty = newHeaders.some(item => !item.key && !item.value)
      if (!hasEmpty) {
        newHeaders.push({ id: uuid(), key: '', value: '', enable: true })
      }
      dispatch(updateHeaders(newHeaders))
    }
  }

  deleteHeadersItem = (id: string) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const headers = intruderOptions.headers
      const newHeaders = headers.filter(item => item.id != id)
      dispatch(updateHeaders(newHeaders))
    }
  }

  updateParams = (id: string, value: HeaderParamsItem) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const params = intruderOptions.params
      const newParams = params.map(item => (item.id === id ? value : item))
      const hasEmpty = newParams.some(item => !item.key && !item.value)
      if (!hasEmpty) {
        newParams.push({ id: uuid(), key: '', value: '', enable: true })
      }
      dispatch(updateParams(newParams))
    }
  }

  deleteParamsItem = (id: string) => {
    return (dispatch: Dispatch, getState: GetState) => {
      const { intruderOptions } = getState()
      const params = intruderOptions.params
      const newParams = params.filter(item => item.id != id)
      dispatch(updateParams(newParams))
    }
  }

  updateSettings = (settings: SettingsParams) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateSettings(settings))
    }
  }
}

export default new IntruderReduxAction()
