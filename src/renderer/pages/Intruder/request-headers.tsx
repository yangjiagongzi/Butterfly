import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import IntruderReduxAction from '~/renderer/action/intruder'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { requestContent } from './styles'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const RequestHeaders: React.FC<PropsForRedux> = ({
  intruderOptions,
  updateMethod
}: PropsForRedux) => {
  const appTheme = useTheme()

  return <div className={requestContent(appTheme)}></div>
}

function mapStateToProps(state: StateType) {
  return {
    intruderOptions: state.intruderOptions
  }
}
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateMethod: IntruderReduxAction.updateMethod
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestHeaders)
