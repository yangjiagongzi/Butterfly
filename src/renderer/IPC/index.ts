import { ipcRenderer } from 'electron'
import { ThemeMode } from '~/constant/app'
import { EventName, EventParams, EventResponse } from '~/constant/event'

function ipcSend<E extends Values<typeof EventName>>(eventName: E, params: EventParams[E]) {
  ipcRenderer.send(eventName, params)
}

function ipcInvoke<E extends Values<typeof EventName>>(
  eventName: E,
  params: EventParams[E]
): Promise<EventResponse[E]> {
  return ipcRenderer.invoke(eventName, params)
}

export const showMessageBox = (message: string) => {
  ipcSend(EventName.ShowMessageBox, message)
}

export const getThemeMode = async () => {
  return await ipcInvoke(EventName.RequestThemeMode, undefined)
}

export const setThemeMode = async (themeMode: Values<typeof ThemeMode>) => {
  return await ipcInvoke(EventName.UpdateThemeMode, themeMode)
}

export const getDarkMode = async () => {
  return await ipcInvoke(EventName.RequestDarkMode, undefined)
}
