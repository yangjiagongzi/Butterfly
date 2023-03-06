import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import CaesarCipher from './CaesarCipher'
import { container } from './styles'

const Decoder: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.DECODER} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.DECODER.childs[0].path} element={<div />} />
        <Route path={RoutePath.DECODER.childs[1].path} element={<div />} />
        <Route path={RoutePath.DECODER.childs[2].path} element={<div />} />
        <Route path={RoutePath.DECODER.childs[3].path} element={<div />} />
        <Route path={RoutePath.DECODER.childs[4].path} element={<CaesarCipher />} />
      </Routes>
    </div>
  )
}

export default Decoder
