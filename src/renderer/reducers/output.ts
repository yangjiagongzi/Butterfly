import { Action } from '~/type/redux'
import { OutputResult } from '~/type/redux/output'
import { OUTPUT_RESULT_UPDATE_KEY } from '../action/output'

export function outputResult(state: OutputResult = [], action: Action) {
  switch (action.type) {
    case OUTPUT_RESULT_UPDATE_KEY:
      return action.result
    default:
      return state
  }
}
