import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import Icon, { IconName } from '~/renderer/component/Icon'
import { navBar, navBarItem } from '~/renderer/styles/router'
import { useTheme } from '../component/UseTheme'

type NavBarItemProps = {
  routePath: Values<typeof RoutePath>['path']
  icon: IconName
  title: string
}

const NavBarItem: React.FC<NavBarItemProps> = ({ routePath, icon, title }: NavBarItemProps) => {
  const appTheme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const active =
    routePath === RoutePath.HOME.path
      ? location.pathname === RoutePath.HOME.path
      : location.pathname.startsWith(routePath.replace(/\*$/g, ''))
  const iconColor = active ? appTheme.colors.background : appTheme.colors.textDark

  return (
    <div className={navBarItem(appTheme, active)} onClick={() => navigate(routePath)}>
      <Icon name={icon} size={'md'} color={iconColor} />
      <div className="note">{title}</div>
    </div>
  )
}

const NavBar: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={navBar(appTheme)}>
      <NavBarItem routePath={RoutePath.HOME.path} icon="Home" title="主页" />
      <NavBarItem routePath={RoutePath.INTRUDER.path} icon="Intruder" title="入侵" />
      <NavBarItem routePath={RoutePath.OUTPUT.path} icon="Output" title="输出" />
      <NavBarItem routePath={RoutePath.NOTE.path} icon="Note" title="笔记" />
      <NavBarItem routePath={RoutePath.OTHERTOOLS.path} icon="Tool" title="其他工具" />
      <div style={{ width: '100%', height: '100%', flex: 1 }}></div>
      <NavBarItem routePath={RoutePath.SETTINGS.path} icon="Settings" title="设置" />
    </div>
  )
}

export default NavBar
