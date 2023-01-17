import { Store as ReduxStore, CombinedState } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { IntruderOptions, IntruderAction } from './intruder'
import { NoteAction, NoteTree } from './note'
import { OutputResult, OutputAction } from './output'

export type Action = IntruderAction | OutputAction | NoteAction

export type State = {
  intruderOptions: IntruderOptions
  outputResult: OutputResult
  noteTree: NoteTree
}
export type Store = ReduxStore<CombinedState<State>, Action>
export type Dispatch = ThunkDispatch<CombinedState<State>, null, Action>
export type GetState = Store['getState']

export type SyncAction = (dispatch: Dispatch, getState: GetState) => void
export type AsyncAction = (dispatch: Dispatch, getState: GetState) => Promise<void>
