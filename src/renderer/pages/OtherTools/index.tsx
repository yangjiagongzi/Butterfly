import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ToolList from '~/renderer/component/ToolList'
import ColorConvert from '~/renderer/pages/ColorConvert'
import HexConvert from '~/renderer/pages/HexConvert'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { container } from './styles'
import { RoutePath } from '~/constant/route'

type Props = {
  appTheme: AppTheme
}

const OtherTools: React.FC<Props> = ({ appTheme }: Props) => {
  return (
    <div className={container(appTheme)}>
      <ToolList appTheme={appTheme} />
      <Routes>
        <Route path="*" />
        <Route
          path={RoutePath.OTHERTOOLS.childs[0].path}
          element={<HexConvert appTheme={appTheme} />}
        />
        <Route
          path={RoutePath.OTHERTOOLS.childs[1].path}
          element={<ColorConvert appTheme={appTheme} />}
        />
      </Routes>
    </div>
  )
}

export default OtherTools
