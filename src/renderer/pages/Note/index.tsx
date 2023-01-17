import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ConfigKeys } from '~/constant/config'
import ConfigReduxAction from '~/renderer/action/config'
import NoteReduxAction from '~/renderer/action/note'
import MarkDown from '~/renderer/component/MarkDown'
import { State as StateType } from '~/type/redux'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Note: React.FC<PropsForRedux> = ({
  addListenerForConfig,
  removeListenerForConfig,
  refreshNoteTree
}) => {
  const onConfigChange = () => {
    refreshNoteTree()
  }

  useEffect(() => {
    refreshNoteTree()
    addListenerForConfig(ConfigKeys.NotePath, onConfigChange)
    addListenerForConfig(ConfigKeys.NoteFilter, onConfigChange)
    return () => {
      removeListenerForConfig(ConfigKeys.NotePath, onConfigChange)
      removeListenerForConfig(ConfigKeys.NoteFilter, onConfigChange)
    }
  }, [])

  return (
    <MarkDown
      markdown={`A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `}
    />
  )
}

function mapStateToProps(state: StateType) {
  return {
    noteTree: state.noteTree
  }
}
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addListenerForConfig: ConfigReduxAction.addListener,
      removeListenerForConfig: ConfigReduxAction.removeListener,
      refreshNoteTree: NoteReduxAction.refreshNoteTree
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
