import { nativeTheme } from 'electron'
import { ThemeMode } from '~/constant/app'
import { getConfig } from '~/utils/GraphqlString/config'
import BrowserWindowManagement from '../BrowserWindowManagement'
import { handleGraphql } from '../Graphql'
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
    const configData = await handleGraphql(configParams)
    const { AppearanceTheme } = configData.data?.config as {
      AppearanceTheme: Values<typeof ThemeMode>
      MaxmumConcurrentRequests: number
      DelayBetweenRequests: number
    }
    nativeTheme.themeSource = AppearanceTheme
  }
}

export default new Application()
