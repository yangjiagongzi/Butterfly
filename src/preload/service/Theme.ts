import { ThemeMode } from '~/constant/app'
import {
  EventParams,
  MainSendEventName,
  RendererInvokeEventName,
  RendererSendEventName
} from '~/constant/event'
import IPC from '../common/IPC'

export default class Theme {
  public get = async () => {
    return await IPC.invoke(RendererInvokeEventName.RequestThemeMode, undefined)
  }

  public set = async (themeMode: Values<typeof ThemeMode>) => {
    await IPC.send(RendererSendEventName.UpdateThemeMode, themeMode)
  }

  public isDarkMode = async () => {
    return await IPC.invoke(RendererInvokeEventName.RequestDarkMode, undefined)
  }

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
