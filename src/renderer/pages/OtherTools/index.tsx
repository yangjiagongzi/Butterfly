import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import ColorConvert from './ColorConvert'
import CurlParse from './CurlParse'
import HexConvert from './HexConvert'
import SubnetMask from './SubnetMask'
import { container } from './styles'

const OtherTools: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.OTHERTOOLS} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.OTHERTOOLS.childs[0].path} element={<HexConvert />} />
        <Route path={RoutePath.OTHERTOOLS.childs[1].path} element={<ColorConvert />} />
        <Route path={RoutePath.OTHERTOOLS.childs[2].path} element={<SubnetMask />} />
        <Route path={RoutePath.OTHERTOOLS.childs[3].path} element={<CurlParse />} />
      </Routes>
    </div>
  )
}

export default OtherTools
