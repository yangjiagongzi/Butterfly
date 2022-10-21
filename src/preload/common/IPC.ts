import { ipcRenderer } from 'electron'
import { EventName, EventParams, EventResponse } from '~/constant/event'

export default class IPC {
  static send = (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args)
  }

  static invoke = <E extends Values<typeof EventName>>(
    eventName: E,
    params: EventParams[E]
  ): Promise<EventResponse[E]> => {
    return ipcRenderer.invoke(eventName, params)
  }

  static on = (channel: string, listener: (...args: any[]) => void) => {
    ipcRenderer.on(channel, listener)
  }

  static removeListener = (channel: string, listener: (...args: any[]) => void) => {
    ipcRenderer.removeListener(channel, listener)
  }
}
