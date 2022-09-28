import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import SettingsGeneral from '../SettingsGeneral'
import { container } from './styles'

const Settings: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.SETTINGS} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.SETTINGS.childs[0].path} element={<SettingsGeneral />} />
      </Routes>
    </div>
  )
}

export default Settings
