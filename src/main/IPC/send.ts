import { BrowserWindow, nativeTheme } from 'electron'
import { EventName } from '~/constant/event'

export const onDarkModeUpdate = (windows: BrowserWindow[]) => {
  windows.forEach(item => {
    item.webContents.send(EventName.OnDarkModeUpdate, nativeTheme.shouldUseDarkColors)
  })
}
