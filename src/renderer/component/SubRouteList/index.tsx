import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { toolItem, toolList } from './styles'

type Props = {
  appTheme: AppTheme
  routerTemplate: {
    path: string
    childs: readonly {
      title: string
      path: string
    }[]
  }
}

const ToolList: React.FC<Props> = ({ appTheme, routerTemplate }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

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
