import { ThemeMode } from '~/constant/app'
import { EventName } from '~/constant/event'
import IPC from '../common/IPC'

export default class Theme {
  public get = async () => {
    return await IPC.invoke(EventName.RequestThemeMode, undefined)
  }

  public set = async (themeMode: Values<typeof ThemeMode>) => {
    return await IPC.invoke(EventName.UpdateThemeMode, themeMode)
  }

  public isDarkMode = async () => {
    return await IPC.invoke(EventName.RequestDarkMode, undefined)
  }
}
