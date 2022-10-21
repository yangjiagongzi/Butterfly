import { EventParams, MainSendEventName } from '~/constant/event'
import IPC from '../common/IPC'

export default class IpcEvent {
  public on = <E extends Values<typeof MainSendEventName>>(
    eventName: E,
    listener: (event: Electron.IpcRendererEvent, params: EventParams[E]) => void
  ) => {
    IPC.on(eventName, listener)
  }

  public removeListener = <E extends Values<typeof MainSendEventName>>(
    eventName: E,
    listener: (event: Electron.IpcRendererEvent, params: EventParams[E]) => void
  ) => {
    IPC.removeListener(eventName, listener)
  }
}
