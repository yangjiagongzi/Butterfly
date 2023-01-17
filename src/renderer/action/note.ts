import { Dispatch, GetState } from '~/type/redux'
import { NoteTree, NOTE_TREE_UPDATE } from '~/type/redux/note'

export const NOTE_TREE_UPDATE_KEY = 'NOTE/TREE/UPDATE'

function updateNoteTree(tree: NoteTree): NOTE_TREE_UPDATE {
  return {
    type: NOTE_TREE_UPDATE_KEY,
    noteTree: tree
  }
}

class NoteReduxAction {
  refreshNoteTree = () => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(updateNoteTree([]))
    }
  }
}

export default new NoteReduxAction()
