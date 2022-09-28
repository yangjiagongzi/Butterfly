import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Theme } from '~/constant/app'
import { RoutePath } from '~/constant/route'
import { navBar, navBarItem } from '~/renderer/styles/router'
import Icon, { IconName } from '~/renderer/component/Icon'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type NavBarItemProps = {
  appTheme: AppTheme
  routePath: Values<typeof RoutePath>['path']
  icon: IconName
  title: string
}

const NavBarItem: React.FC<NavBarItemProps> = ({
  appTheme,
  routePath,
  icon,
  title
}: NavBarItemProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const active = location.pathname.startsWith(routePath.replace(/\*$/g, ''))
  const iconColor = active ? appTheme.colors.textDark : appTheme.colors.textLight

  return (
    <div className={navBarItem(appTheme)} onClick={() => navigate(routePath)}>
      <Icon name={icon} size={'md'} color={iconColor} />
      <div className="note">{title}</div>
      {active ? <div className="activeBar" /> : null}
    </div>
  )
}

type NavBarProps = {
  appTheme: AppTheme
  setTheme: (theme: Values<typeof Theme>) => void
}
const NavBar: React.FC<NavBarProps> = ({ appTheme, setTheme }: NavBarProps) => {
  return (
    <div className={navBar(appTheme)}>
      <NavBarItem
        appTheme={appTheme}
        routePath={RoutePath.INTRUDER.path}
        icon="Intruder"
        title="入侵"
      />
      <NavBarItem
        appTheme={appTheme}
        routePath={RoutePath.DECODER.path}
        icon="Decoder"
        title="编码"
      />
      <NavBarItem
        appTheme={appTheme}
        routePath={RoutePath.COMPARER.path}
        icon="Comparer"
        title="比较"
      />
      <NavBarItem
        appTheme={appTheme}
        routePath={RoutePath.OTHERTOOLS.path}
        icon="OtherTools"
        title="其他工具"
      />
      <div style={{ width: '100%', height: '100%', flex: 1 }}></div>
      <NavBarItem
        appTheme={appTheme}
        routePath={RoutePath.SETTINGS.path}
        icon="Settings"
        title="设置"
      />
    </div>
  )
}

export default NavBar
