import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../UseTheme'
import { toolItem, toolList } from './styles'

type Props = {
  routerTemplate: {
    path: string
    childs: readonly {
      title: string
      path: string
    }[]
  }
}

const ToolList: React.FC<Props> = ({ routerTemplate }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const appTheme = useTheme()

  return (
    <div className={toolList(appTheme)}>
      {routerTemplate.childs.map(item => {
        const active = location.pathname.startsWith(
          `${routerTemplate.path.replace(/\*$/g, '')}${item.path}`
        )
        return (
          <div
            key={item.path}
            className={`${toolItem(appTheme)} ${active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.title}
          </div>
        )
      })}
    </div>
  )
}

export default ToolList
