import { ThemeMode } from '~/constant/app'
import { RendererSendEventName, RendererInvokeEventName } from '~/constant/event'
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
}
