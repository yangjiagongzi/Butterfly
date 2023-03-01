import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import CodeGenerate from './CodeGenerate'
import { container } from './styles'

const Dictionary: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.DICTIONARY} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.DICTIONARY.childs[0].path} element={<CodeGenerate />} />
      </Routes>
    </div>
  )
}

export default Dictionary
