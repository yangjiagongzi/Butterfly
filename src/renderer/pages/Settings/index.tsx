import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import SettingsGeneral from '../SettingsGeneral'
import { container } from './styles'

type Props = {
  appTheme: AppTheme
}

const Settings: React.FC<Props> = ({ appTheme }: Props) => {
  return (
    <div className={container(appTheme)}>
      <SubRouteList appTheme={appTheme} routerTemplate={RoutePath.SETTINGS} />
      <Routes>
        <Route path="*" />
        <Route
          path={RoutePath.SETTINGS.childs[0].path}
          element={<SettingsGeneral appTheme={appTheme} />}
        />
      </Routes>
    </div>
  )
}

export default Settings
