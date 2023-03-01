import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import { container } from './styles'

const Decoder: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.DECODER} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.DECODER.childs[0].path} element={<div />} />
      </Routes>
    </div>
  )
}

export default Decoder
