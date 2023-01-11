import React from 'react'
import { SettingPath } from '~/constant/route'
import { settingTemplateData } from './setting-page-template-data'
import SettingTemplate from './setting-page-template-framework'

type Props = {
  path: Values<typeof SettingPath>
}

const SettingPageRender: React.FC<Props> = ({ path }) => {
  return <SettingTemplate settingItems={settingTemplateData[path]} />
}

export default SettingPageRender
