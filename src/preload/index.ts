import { contextBridge } from 'electron'
import ThemeEvent from './service/ThemeEvent'
import graphql from './service/Graphql'

const service = {
  ThemeEvent: new ThemeEvent(),
  graphql
}

contextBridge.exposeInMainWorld('service', service)

declare global {
  interface Window {
    service: typeof service
  }
}
