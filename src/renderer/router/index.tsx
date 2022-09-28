import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import Comparer from '~/renderer/pages/Comparer'
import Decoder from '~/renderer/pages/Decoder'
import HomePage from '~/renderer/pages/HomePage'
import Intruder from '~/renderer/pages/Intruder'
import OtherTools from '~/renderer/pages/OtherTools'
import Settings from '~/renderer/pages/Settings'
import { content, router } from '~/renderer/styles/router'
import Global from '../component/Global'
import { useTheme } from '../component/UseTheme'
import NavBar from './NavBar'

const Root: React.FC = () => {
  const appTheme = useTheme()

  return (
    <HashRouter>
      <div className={router(appTheme)}>
        <NavBar />
        <div className={content(appTheme)}>
          <Routes>
            <Route path={RoutePath.HOME.path} element={<HomePage />} />
            <Route path={RoutePath.INTRUDER.path} element={<Intruder />} />
            <Route path={RoutePath.DECODER.path} element={<Decoder />} />
            <Route path={RoutePath.COMPARER.path} element={<Comparer />} />
            <Route path={RoutePath.OTHERTOOLS.path} element={<OtherTools />} />
            <Route path={RoutePath.SETTINGS.path} element={<Settings />} />
          </Routes>
        </div>
        <Global />
      </div>
    </HashRouter>
  )
}

export default Root
