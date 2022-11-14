import { ipcMain, nativeTheme } from 'electron'
import { EventParams, EventResponse, RendererInvokeEventName } from '~/constant/event'
import { handleGraphql } from '../Graphql'
import { onDarkModeUpdate } from './send'

export function registListener() {
  ipcMain.handle(
    RendererInvokeEventName.Graphql,
    (
      event,
      params: EventParams[typeof RendererInvokeEventName.Graphql]
    ): EventResponse[typeof RendererInvokeEventName.Graphql] => {
      return handleGraphql(params)
    }
  )

  nativeTheme.addListener('updated', () => {
    onDarkModeUpdate()
  })
}

export function removeListener() {
  ipcMain.removeHandler(RendererInvokeEventName.Graphql)
  nativeTheme.removeAllListeners()
}
