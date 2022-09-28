import { BrowserWindow, dialog, ipcMain, nativeTheme } from 'electron'
import { EventName, EventParams, EventResponse } from '~/constant/event'
import { onDarkModeUpdate } from './send'

export function registListener(windows: BrowserWindow[]) {
  ipcMain.on(
    EventName.ShowMessageBox,
    (event, params: EventParams[typeof EventName.ShowMessageBox]) => {
      dialog.showMessageBox({ message: params })
    }
  )

  ipcMain.handle(
    EventName.RequestThemeMode,
    (): EventResponse[typeof EventName.RequestThemeMode] => {
      return nativeTheme.themeSource
    }
  )

  ipcMain.handle(
    EventName.UpdateThemeMode,
    (event, params: EventParams[typeof EventName.UpdateThemeMode]) => {
      nativeTheme.themeSource = params
    }
  )

  ipcMain.handle(EventName.RequestDarkMode, (): EventResponse[typeof EventName.RequestDarkMode] => {
    return nativeTheme.shouldUseDarkColors
  })

  nativeTheme.addListener('updated', () => {
    onDarkModeUpdate(windows)
  })
}

export function removeListener() {
  ipcMain.removeAllListeners()
  ipcMain.removeHandler(EventName.RequestThemeMode)
  ipcMain.removeHandler(EventName.UpdateThemeMode)
  ipcMain.removeHandler(EventName.RequestDarkMode)
  nativeTheme.removeAllListeners()
}
