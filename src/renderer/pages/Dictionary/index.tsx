import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import DirectoryTraversal from './DirectoryTraversal'
import NumberGenerate from './Number'
import { container } from './styles'

const Dictionary: React.FC = () => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.DICTIONARY} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.DICTIONARY.childs[0].path} element={<NumberGenerate />} />
        <Route path={RoutePath.DICTIONARY.childs[1].path} element={<NumberGenerate />} />
        <Route path={RoutePath.DICTIONARY.childs[2].path} element={<DirectoryTraversal />} />
      </Routes>
    </div>
  )
}

export default Dictionary
