import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Button from '~/renderer/component/Button'
import Tab from '~/renderer/component/Tab'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import AttachType from './attack-type'
import Payload from './payload'
import Request from './request'
import Settings from './settings'
import { container, content, startBtn } from './styles'

const TabTypes = {
  type: { id: 'type', name: '攻击类型' },
  request: { id: 'request', name: '请求' },
  payload: { id: 'payload', name: '载荷' },
  options: { id: 'options', name: '设置' }
} as const
type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Intruder: React.FC<PropsForRedux> = ({ intruderOptions }: PropsForRedux) => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState<Values<typeof TabTypes>['id']>(TabTypes.type.id)
  const tabs = useMemo(() => Object.values(TabTypes), [])
  return (
    <div className={container(appTheme)}>
      <Button
        className={startBtn(appTheme)}
        title={'开始'}
        onClick={() => console.log(intruderOptions)}
      />
      <Tab
        size="large"
        data={tabs}
        onChange={value => setChoose(value.id as Values<typeof TabTypes>['id'])}
      />
      <div className={content(appTheme)}>
        {choose === TabTypes.type.id ? <AttachType /> : null}
        {choose === TabTypes.request.id ? <Request /> : null}
        {choose === TabTypes.payload.id ? <Payload /> : null}
        {choose === TabTypes.options.id ? <Settings /> : null}
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
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Intruder)
