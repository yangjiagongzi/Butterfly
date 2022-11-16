import { nativeTheme } from 'electron'
import { ThemeMode } from '~/constant/app'
import { ConfigKey, ConfigKeys, ConfigValue } from '~/constant/config'
import { getConfig } from '~/utils/GraphqlString/config'
import BrowserWindowManagement from '../BrowserWindowManagement'
import { handleGraphqlQuery } from '../Graphql'
import { startApolloServer } from '../Graphql/apollo-server'
import { registListener } from '../IPC/listener'

class Application {
  start = () => {
    registListener()
    startApolloServer()
    this.initConfig()
    BrowserWindowManagement.initMainWindow()
  }

  onActivate = () => {
    BrowserWindowManagement.onAppActivate()
  }

  initConfig = async () => {
    const configParams = getConfig()
    const configData = await handleGraphqlQuery(configParams)
    const AppearanceTheme = configData.data?.config?.AppearanceTheme
    if (AppearanceTheme) {
      nativeTheme.themeSource = AppearanceTheme as Values<typeof ThemeMode>
    }
  }

  upsertConfig = async <K extends ConfigKey>(key: K, value: ConfigValue<K>) => {
    if (key === ConfigKeys.AppearanceTheme) {
      nativeTheme.themeSource = value as Values<typeof ThemeMode>
    }
  }
}

export default new Application()
