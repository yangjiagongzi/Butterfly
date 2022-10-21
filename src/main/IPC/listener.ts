import { dialog, ipcMain, nativeTheme } from 'electron'
import {
  RendererSendEventName,
  RendererInvokeEventName,
  EventParams,
  EventResponse
} from '~/constant/event'
import { onDarkModeUpdate } from './send'

export function registListener() {
  ipcMain.on(
    RendererSendEventName.ShowMessageBox,
    (event, params: EventParams[typeof RendererSendEventName.ShowMessageBox]) => {
      dialog.showMessageBox({ message: params })
    }
  )

  ipcMain.handle(
    RendererInvokeEventName.RequestThemeMode,
    (): EventResponse[typeof RendererInvokeEventName.RequestThemeMode] => {
      return nativeTheme.themeSource
    }
  )

  ipcMain.on(
    RendererSendEventName.UpdateThemeMode,
    (event, params: EventParams[typeof RendererSendEventName.UpdateThemeMode]) => {
      nativeTheme.themeSource = params
    }
  )

  ipcMain.handle(
    RendererInvokeEventName.RequestDarkMode,
    (): EventResponse[typeof RendererInvokeEventName.RequestDarkMode] => {
      return nativeTheme.shouldUseDarkColors
    }
  )

  nativeTheme.addListener('updated', () => {
    onDarkModeUpdate()
  })
}

export function removeListener() {
  ipcMain.removeAllListeners()
  ipcMain.removeHandler(RendererInvokeEventName.RequestThemeMode)
  ipcMain.removeHandler(RendererInvokeEventName.RequestDarkMode)
  nativeTheme.removeAllListeners()
}
