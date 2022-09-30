import React, { useState } from 'react'
import Button from '~/renderer/component/Button'
import Tab from '~/renderer/component/Tab'
import { useTheme } from '~/renderer/component/UseTheme'
import AttachType from './attack-type'
import Payload from './payload'
import Request from './request'
import Settings from './settings'
import { container, startBtn, content } from './styles'

const Intruder: React.FC = () => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState('攻击类型')
  return (
    <div className={container(appTheme)}>
      <Button className={startBtn(appTheme)} title={'开始'} />
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

export default Intruder
