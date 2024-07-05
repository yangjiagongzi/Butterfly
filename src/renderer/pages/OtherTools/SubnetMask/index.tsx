import React, { useMemo, useState } from 'react'
import Tab from '~/renderer/component/Tab'
import { useTheme } from '~/renderer/component/UseTheme'
import { container } from './styles'
import IP from './IP'
import Mask from './Mask'

const TabTypes = {
  ip: { id: 'ip', name: 'IP地址计算' },
  mask: { id: 'mask', name: '子网掩码转换' }
} as const

const SubnetMask: React.FC = () => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState<Values<typeof TabTypes>['id']>(TabTypes.ip.id)
  const tabs = useMemo(() => Object.values(TabTypes), [])

  return (
    <div className={container(appTheme)}>
      <Tab
        size="large"
        data={tabs}
        onChange={value => setChoose(value.id as Values<typeof TabTypes>['id'])}
      />
      {choose === TabTypes.ip.id ? <IP /> : null}
      {choose === TabTypes.mask.id ? <Mask /> : null}
    </div>
  )
}

export default SubnetMask
