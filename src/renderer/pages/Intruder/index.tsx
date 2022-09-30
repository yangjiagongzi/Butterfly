import React from 'react'
import Button from '~/renderer/component/Button'
import Tab from '~/renderer/component/Tab'
import { useTheme } from '~/renderer/component/UseTheme'
import AttachType from './attack-type'
import { container, startBtn, content } from './styles'

const Intruder: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <Button className={startBtn(appTheme)} title={'开始'} />
      <Tab
        size="large"
        data={['攻击类型', '请求', '载荷', '设置']}
        onChange={value => console.log(value)}
      />
      <div className={content(appTheme)}>
        <AttachType />
      </div>
    </div>
  )
}

export default Intruder
