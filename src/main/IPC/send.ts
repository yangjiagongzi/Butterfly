import { BrowserWindow, nativeTheme } from 'electron'
import { EventName } from '~/constant/event'

export const onDarkModeUpdate = () => {
  const allWindows = BrowserWindow.getAllWindows()
  allWindows.forEach(item => {
    item.webContents.send(EventName.OnDarkModeUpdate, nativeTheme.shouldUseDarkColors)
  })
}
