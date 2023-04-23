import React, { useState } from 'react'
import Tab from '~/renderer/component/Tab'
import { useTheme } from '~/renderer/component/UseTheme'
import { container } from './styles'
import IP from './IP'
import Mask from './Mask'

const SubnetMask: React.FC = () => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState('IP地址计算')
  return (
    <div className={container(appTheme)}>
      <Tab
        size="large"
        data={['IP地址计算', '子网掩码转换']}
        onChange={value => setChoose(value)}
      />
      {choose === 'IP地址计算' ? <IP /> : null}
      {choose === '子网掩码转换' ? <Mask /> : null}
    </div>
  )
}

export default SubnetMask
