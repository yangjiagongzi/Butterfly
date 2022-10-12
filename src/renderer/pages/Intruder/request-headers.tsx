import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import IntruderReduxAction from '~/renderer/action/intruder'
import ParamsTable from '~/renderer/component/ParamsTable'
import { State as StateType } from '~/type/redux'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const RequestHeaders: React.FC<PropsForRedux> = ({
  intruderOptions,
  updateHeader,
  deleteHeaderItem
}: PropsForRedux) => {
  return (
    <ParamsTable
      params={intruderOptions.header}
      onChange={updateHeader}
      onDelete={deleteHeaderItem}
    />
  )
}

function mapStateToProps(state: StateType) {
  return {
    intruderOptions: state.intruderOptions
  }
}
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateHeader: IntruderReduxAction.updateHeader,
      deleteHeaderItem: IntruderReduxAction.deleteHeaderItem
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestHeaders)
