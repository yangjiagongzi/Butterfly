import React from 'react'
import Tab from '~/renderer/component/Tab'
import { useTheme } from '~/renderer/component/UseTheme'
import { container } from './styles'

const Intruder: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <Tab
        size="large"
        data={['asdfas', 'asfasdf', 'adsfasdf']}
        onChange={value => console.log(value)}
      />
    </div>
  )
}

export default Intruder
