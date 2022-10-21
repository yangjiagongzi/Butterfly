import { BrowserWindow, nativeTheme } from 'electron'
import { MainSendEventName } from '~/constant/event'

export const onDarkModeUpdate = () => {
  const allWindows = BrowserWindow.getAllWindows()
  allWindows.forEach(item => {
    item.webContents.send(MainSendEventName.OnDarkModeUpdate, nativeTheme.shouldUseDarkColors)
  })
}
