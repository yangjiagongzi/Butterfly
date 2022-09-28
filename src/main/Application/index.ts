import BrowserWindowManagement from '../BrowserWindowManagement'
import { registListener } from '../IPC/listener'

class Application {
  start = () => {
    registListener()
    BrowserWindowManagement.initMainWindow()
  }
}

export default new Application()
