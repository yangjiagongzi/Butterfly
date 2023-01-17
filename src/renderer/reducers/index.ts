import { combineReducers } from 'redux'
import { intruderOptions } from './intruder'
import { noteTree } from './note'
import { outputResult } from './output'

export default function createRootReducer() {
  return combineReducers({
    intruderOptions,
    outputResult,
    noteTree
  })
}
