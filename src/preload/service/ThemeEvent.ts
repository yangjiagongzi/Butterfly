import { EventParams, MainSendEventName } from '~/constant/event'
import IPC from '../common/IPC'

export default class ThemeEvent {
  public addListener = (
    listener: (
      event: Electron.IpcRendererEvent,
      params: EventParams[typeof MainSendEventName.OnDarkModeUpdate]
    ) => void
  ) => {
    IPC.on(MainSendEventName.OnDarkModeUpdate, listener)
  }

  public removeListener = (
    listener: (
      event: Electron.IpcRendererEvent,
      params: EventParams[typeof MainSendEventName.OnDarkModeUpdate]
    ) => void
  ) => {
    IPC.removeListener(MainSendEventName.OnDarkModeUpdate, listener)
  }
}
