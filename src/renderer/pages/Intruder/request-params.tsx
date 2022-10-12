import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import IntruderReduxAction from '~/renderer/action/intruder'
import ParamsTable from '~/renderer/component/ParamsTable'
import { State as StateType } from '~/type/redux'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const RequestParams: React.FC<PropsForRedux> = ({
  intruderOptions,
  updateParams,
  deleteParamsItem
}: PropsForRedux) => {
  return (
    <ParamsTable
      params={intruderOptions.params}
      onChange={updateParams}
      onDelete={deleteParamsItem}
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
      updateParams: IntruderReduxAction.updateParams,
      deleteParamsItem: IntruderReduxAction.deleteParamsItem
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestParams)
