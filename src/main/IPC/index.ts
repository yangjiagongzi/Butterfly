import { dialog, ipcMain, nativeTheme } from 'electron'
import { EventName, EventParams } from '~/constant/event'

export function registListener() {
  ipcMain.on(
    EventName.ShowMessageBox,
    (event, params: EventParams[typeof EventName.ShowMessageBox]) => {
      dialog.showMessageBox({ message: params })
    }
  )

  ipcMain.handle(EventName.RequestThemeMode, () => {
    return nativeTheme.themeSource
  })

  ipcMain.handle(
    EventName.UpdateThemeMode,
    (event, params: EventParams[typeof EventName.UpdateThemeMode]) => {
      nativeTheme.themeSource = params
    }
  )
}
