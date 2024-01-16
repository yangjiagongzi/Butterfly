import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import Base64 from './Base64'
import CaesarCipher from './CaesarCipher'
import URL from './URL'
import { container } from './styles'

const Decoder: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.DECODER} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.DECODER.childs[0].path} element={<URL />} />
        <Route path={RoutePath.DECODER.childs[1].path} element={<Base64 />} />
        <Route path={RoutePath.DECODER.childs[2].path} element={<CaesarCipher />} />
      </Routes>
    </div>
  )
}

export default Decoder
