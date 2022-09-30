import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import HomePage from '~/renderer/pages/HomePage'
import Intruder from '~/renderer/pages/Intruder'
import Note from '~/renderer/pages/Note'
import OtherTools from '~/renderer/pages/OtherTools'
import Output from '~/renderer/pages/Output'
import Settings from '~/renderer/pages/Settings'
import store from '~/renderer/stores'
import { content, router } from '~/renderer/styles/router'
import Global from '../component/Global'
import { useTheme } from '../component/UseTheme'
import NavBar from './NavBar'

const Root: React.FC = () => {
  const appTheme = useTheme()

  return (
    <Provider store={store}>
      <HashRouter>
        <div className={router(appTheme)}>
          <NavBar />
          <div className={content(appTheme)}>
            <Routes>
              <Route path={RoutePath.HOME.path} element={<HomePage />} />
              <Route path={RoutePath.INTRUDER.path} element={<Intruder />} />
              <Route path={RoutePath.OUTPUT.path} element={<Output />} />
              <Route path={RoutePath.NOTE.path} element={<Note />} />
              <Route path={RoutePath.OTHERTOOLS.path} element={<OtherTools />} />
              <Route path={RoutePath.SETTINGS.path} element={<Settings />} />
            </Routes>
          </div>
          <Global />
        </div>
      </HashRouter>
    </Provider>
  )
}

export default Root
