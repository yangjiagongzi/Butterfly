import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import BruteForce from '../BruteForce'
import DictionaryGenerate from '../DictionaryGenerate'
import DirectoryTraversal from '../DirectoryTraversal'
import { container } from './styles'

const Intruder: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <SubRouteList routerTemplate={RoutePath.INTRUDER} />
      <Routes>
        <Route path="*" />
        <Route path={RoutePath.INTRUDER.childs[0].path} element={<DirectoryTraversal />} />
        <Route path={RoutePath.INTRUDER.childs[1].path} element={<DictionaryGenerate />} />
        <Route path={RoutePath.INTRUDER.childs[2].path} element={<BruteForce />} />
      </Routes>
    </div>
  )
}

export default Intruder
