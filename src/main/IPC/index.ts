import { dialog, ipcMain } from 'electron'
import { EventName, EventParams } from '~/constant/event'

export function registListener() {
  ipcMain.on(
    EventName.ShowMessageBox,
    (event, params: EventParams[typeof EventName.ShowMessageBox]) => {
      dialog.showMessageBox({ message: params })
    }
  )
}
