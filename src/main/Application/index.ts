import { app } from 'electron'
import path from 'path'
import BrowserWindowManagement from '../BrowserWindowManagement'
import Config from '../Config'
import GraphqlServer from '../Graphql'
import IPCListener from '../IPCListener'

class Application {
  start = () => {
    app.dock.setIcon(path.join(process.cwd(), 'src/assets/icon/icon_circle.png'))
    IPCListener.registListener()
    GraphqlServer.startApolloServer()
    Config.initConfig()
    BrowserWindowManagement.initMainWindow()
  }

  onActivate = () => {
    BrowserWindowManagement.onAppActivate()
  }
}

export default new Application()
