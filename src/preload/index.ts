import { contextBridge } from 'electron'
import ThemeEvent from './service/ThemeEvent'
import Graphql from './service/Graphql'

const service = {
  ThemeEvent: new ThemeEvent(),
  Graphql: new Graphql()
}

contextBridge.exposeInMainWorld('service', service)

declare global {
  interface Window {
    service: typeof service
  }
}
