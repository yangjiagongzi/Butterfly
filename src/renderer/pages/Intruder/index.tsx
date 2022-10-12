import React, { useState } from 'react'
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

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Intruder: React.FC<PropsForRedux> = ({ intruderOptions }: PropsForRedux) => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState('攻击类型')
  return (
    <div className={container(appTheme)}>
      <Button
        className={startBtn(appTheme)}
        title={'开始'}
        onClick={() => console.log(intruderOptions)}
      />
      <Tab
        size="large"
        data={['攻击类型', '请求', '载荷', '设置']}
        onChange={value => setChoose(value)}
      />
      <div className={content(appTheme)}>
        {choose === '攻击类型' ? <AttachType /> : null}
        {choose === '请求' ? <Request /> : null}
        {choose === '载荷' ? <Payload /> : null}
        {choose === '设置' ? <Settings /> : null}
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
