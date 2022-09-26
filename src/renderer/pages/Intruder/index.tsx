import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import ColorConvert from '../ColorConvert'
import DirectoryTraversal from '../DirectoryTraversal'
import { container } from './styles'

type Props = {
  appTheme: AppTheme
}

const Intruder: React.FC<Props> = ({ appTheme }: Props) => {
  return (
    <div className={container(appTheme)}>
      <SubRouteList appTheme={appTheme} routerTemplate={RoutePath.INTRUDER} />
      <Routes>
        <Route path="*" />
        <Route
          path={RoutePath.INTRUDER.childs[0].path}
          element={<DirectoryTraversal appTheme={appTheme} />}
        />
        <Route
          path={RoutePath.INTRUDER.childs[1].path}
          element={<ColorConvert appTheme={appTheme} />}
        />
      </Routes>
    </div>
  )
}

export default Intruder
