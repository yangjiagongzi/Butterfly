import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AttackType } from '~/constant/intruder'
import IntruderReduxAction from '~/renderer/action/intruder'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { container, inputBox } from './styles'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const AttachType: React.FC<PropsForRedux> = ({
  intruderOptions,
  updateAttackType
}: PropsForRedux) => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <div className={inputBox(appTheme)}>
        <Select
          title={'攻击类型'}
          data={Object.values(AttackType)}
          value={intruderOptions.attackType}
          onChange={(value: string) => {
            updateAttackType(value as Values<typeof AttackType>)
          }}
        />
      </div>
    </div>
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
      updateAttackType: IntruderReduxAction.updateAttackType
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachType)
