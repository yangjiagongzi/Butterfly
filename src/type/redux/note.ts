import { NOTE_TREE_UPDATE_KEY } from '~/renderer/action/note'

type FileItem = {
  isDir: boolean
  name: string
  path: string
  childs: Array<FileItem>
}

export type NoteTree = Array<FileItem>

export interface NOTE_TREE_UPDATE {
  type: typeof NOTE_TREE_UPDATE_KEY
  noteTree: NoteTree
}

export type NoteAction = NOTE_TREE_UPDATE
