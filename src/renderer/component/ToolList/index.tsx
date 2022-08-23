import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { toolItem, toolList } from './styles'
import { RoutePath } from '~/constant/route'

type Props = {
  appTheme: AppTheme
}

const ToolList: React.FC<Props> = ({ appTheme }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={toolList(appTheme)}>
      {RoutePath.OTHERTOOLS.childs.map(item => {
        const active = location.pathname.startsWith(
          `${RoutePath.OTHERTOOLS.path.replace(/\*$/g, '')}${item.path}`
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
