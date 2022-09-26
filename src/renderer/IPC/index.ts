import { ipcRenderer } from 'electron'
import { EventName, EventParams } from '~/constant/event'

function ipcSend<E extends Values<typeof EventName>>(eventName: E, params: EventParams[E]) {
  ipcRenderer.send(eventName, params)
}

export const showMessageBox = (message: string) => {
  ipcSend(EventName.ShowMessageBox, message)
}
