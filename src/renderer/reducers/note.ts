import { Action } from '~/type/redux'
import { NoteTree } from '~/type/redux/note'
import { NOTE_TREE_UPDATE_KEY } from '../action/note'

export function noteTree(state: NoteTree = [], action: Action) {
  switch (action.type) {
    case NOTE_TREE_UPDATE_KEY:
      return action.noteTree
    default:
      return state
  }
}
