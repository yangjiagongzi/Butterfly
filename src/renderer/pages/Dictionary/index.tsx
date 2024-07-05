import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '~/constant/route'
import SubRouteList from '~/renderer/component/SubRouteList'
import { useTheme } from '~/renderer/component/UseTheme'
import DateGenerate from './Date'
import DirectoryTraversal from './DirectoryTraversal'
import BruteForcer from './BruteForcer'
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
        <Route path={RoutePath.DICTIONARY.childs[1].path} element={<DateGenerate />} />
        <Route path={RoutePath.DICTIONARY.childs[2].path} element={<BruteForcer />} />
        <Route path={RoutePath.DICTIONARY.childs[3].path} element={<DirectoryTraversal />} />
      </Routes>
    </div>
  )
}

export default Dictionary
