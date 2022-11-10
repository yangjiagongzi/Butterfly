import BrowserWindowManagement from '../BrowserWindowManagement'
import { startApolloServer } from '../Graphql/apollo-server'
import { registListener } from '../IPC/listener'

class Application {
  start = () => {
    registListener()
    startApolloServer()
    BrowserWindowManagement.initMainWindow()
  }
}

export default new Application()
