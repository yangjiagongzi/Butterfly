import { ConfigKeys } from '~/constant/config'
import { SettingPath } from '~/constant/route'
import SettingsComponent from '~/renderer/component/Settings'

export type SettingTemplateData = {
  key: Values<typeof ConfigKeys>
  title: string
  itemElementRender: React.FC<{ configKey: Values<typeof ConfigKeys> }>
}

const { SettingsAppearance, SettingsNotePath, SettingsNoteFilter } = SettingsComponent

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
      key: ConfigKeys.NotePath,
      title: '笔记路径',
      itemElementRender: SettingsNotePath
    },
    {
      key: ConfigKeys.NoteFilter,
      title: '文件类型',
      itemElementRender: SettingsNoteFilter
    }
  ]
}
