import { contextBridge } from 'electron'
import Clipboard from './service/Clipboard'
import MessageBox from './service/MessageBox'
import Theme from './service/Theme'
import graphql from './service/Graphql'

const service = {
  Clipboard: new Clipboard(),
  MessageBox: new MessageBox(),
  Theme: new Theme(),
  graphql
}

contextBridge.exposeInMainWorld('service', service)

declare global {
  interface Window {
    service: typeof service
  }
}
