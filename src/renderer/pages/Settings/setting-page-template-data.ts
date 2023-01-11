import { ConfigKeys } from '~/constant/config'
import { SettingPath } from '~/constant/route'
import SettingsComponent from '~/renderer/component/Settings'

export type SettingTemplateData = {
  key: Values<typeof ConfigKeys>
  title: string
  itemElementRender: React.FC
}

const { SettingsAppearance, SettingsNotePath } = SettingsComponent

export const settingTemplateData: { [key in Values<typeof SettingPath>]: SettingTemplateData[] } = {
  [SettingPath.GENERAL]: [
    {
      key: ConfigKeys.AppearanceTheme,
      title: '外观',
      itemElementRender: SettingsAppearance
    }
  ],
  [SettingPath.NOTE]: [
    {
      key: ConfigKeys.AppearanceTheme,
      title: '笔记路径',
      itemElementRender: SettingsNotePath
    }
  ]
}
