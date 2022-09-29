import React from 'react'
import { useTheme } from '~/renderer/component/UseTheme'
import { container } from './styles'

const Intruder: React.FC = () => {
  const appTheme = useTheme()
  return <div className={container(appTheme)}>Intruder</div>
}

export default Intruder
