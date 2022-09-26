import React, { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Theme } from '~/constant/app'
import { RoutePath } from '~/constant/route'
import Comparer from '~/renderer/pages/Comparer'
import Decoder from '~/renderer/pages/Decoder'
import HomePage from '~/renderer/pages/HomePage'
import Intruder from '~/renderer/pages/Intruder'
import OtherTools from '~/renderer/pages/OtherTools'
import Settings from '~/renderer/pages/Settings'
import { router, content } from '~/renderer/styles/router'
import { AppTheme } from '~/renderer/styles/theme'
import NavBar from './NavBar'

const Root: React.FC = () => {
  const [theme, setTheme] = useState<Values<typeof Theme>>(Theme.DARK)
  const appTheme = AppTheme(theme)

  return (
    <HashRouter>
      <div className={router(appTheme)}>
        <NavBar appTheme={appTheme} setTheme={setTheme} />
        <div className={content(appTheme)}>
          <Routes>
            <Route path={RoutePath.HOME.path} element={<HomePage />} />
            <Route path={RoutePath.INTRUDER.path} element={<Intruder appTheme={appTheme} />} />
            <Route path={RoutePath.DECODER.path} element={<Decoder />} />
            <Route path={RoutePath.COMPARER.path} element={<Comparer />} />
            <Route path={RoutePath.OTHERTOOLS.path} element={<OtherTools appTheme={appTheme} />} />
            <Route path={RoutePath.SETTINGS.path} element={<Settings />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default Root
