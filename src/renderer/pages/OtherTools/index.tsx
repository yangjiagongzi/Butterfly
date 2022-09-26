import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import ColorConvert from '~/renderer/pages/ColorConvert'
import HexConvert from '~/renderer/pages/HexConvert'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { container } from './styles'

type Props = {
  appTheme: AppTheme
}

const OtherTools: React.FC<Props> = ({ appTheme }: Props) => {
  return (
    <div className={container(appTheme)}>
      <SubRouteList appTheme={appTheme} routerTemplate={RoutePath.OTHERTOOLS} />
      <Routes>
        <Route path="*" />
        <Route
          path={RoutePath.OTHERTOOLS.childs[0].path}
          element={<HexConvert appTheme={appTheme} />}
        />
        <Route
          path={RoutePath.OTHERTOOLS.childs[1].path}
          element={<ColorConvert appTheme={appTheme} />}
        />
      </Routes>
    </div>
  )
}

export default OtherTools
