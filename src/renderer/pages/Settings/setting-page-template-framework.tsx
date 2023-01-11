import React from 'react'
import { useTheme } from '~/renderer/component/UseTheme'
import { SettingTemplateData } from './setting-page-template-data'
import { content, paramGroup } from './styles'

type Props = {
  settingItems: Array<SettingTemplateData>
}

const SettingTemplate: React.FC<Props> = ({ settingItems }) => {
  const appTheme = useTheme()

  return (
    <div className={content(appTheme)}>
      {settingItems.map(item => {
        const { key, title, itemElementRender } = item
        const ItemRender = itemElementRender
        return (
          <div key={key} className={paramGroup(appTheme)}>
            <div className="title">{title}</div>
            <div className="items">
              <ItemRender />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SettingTemplate
