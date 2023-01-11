import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import SettingPageRender from './setting-page-template-render'
import { container } from './styles'

const Settings: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.SETTINGS} />
      <Routes>
        <Route path="*" />
        {RoutePath.SETTINGS.childs.map(({ path }) => (
          <Route key={path} path={path} element={<SettingPageRender path={path} />} />
        ))}
      </Routes>
    </div>
  )
}

export default Settings
