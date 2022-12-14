import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import IntruderReduxAction from '~/renderer/action/intruder'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { content } from './styles'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Settings: React.FC<PropsForRedux> = ({
  intruderOptions,
  updateAttackType
}: PropsForRedux) => {
  const appTheme = useTheme()
  return <div className={content(appTheme)}>Settings</div>
}

function mapStateToProps(state: StateType) {
  return {
    intruderOptions: state.intruderOptions
  }
}
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateAttackType: IntruderReduxAction.updateAttackType
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
