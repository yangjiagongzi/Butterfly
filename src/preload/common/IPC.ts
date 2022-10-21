import { ipcRenderer } from 'electron'
import {
  RendererSendEventName,
  RendererInvokeEventName,
  MainSendEventName,
  EventParams,
  EventResponse
} from '~/constant/event'

export default class IPC {
  static send = <E extends Values<typeof RendererSendEventName>>(
    eventName: E,
    params: EventParams[E]
  ) => {
    ipcRenderer.send(eventName, params)
  }

  static invoke = <E extends Values<typeof RendererInvokeEventName>>(
    eventName: E,
    params: EventParams[E]
  ): Promise<EventResponse[E]> => {
    return ipcRenderer.invoke(eventName, params)
  }

  static on = <E extends Values<typeof MainSendEventName>>(
    eventName: E,
    listener: (event: Electron.IpcRendererEvent, params: EventParams[E]) => void
  ) => {
    ipcRenderer.on(eventName, listener)
  }

  static removeListener = <E extends Values<typeof MainSendEventName>>(
    eventName: E,
    listener: (event: Electron.IpcRendererEvent, params: EventParams[E]) => void
  ) => {
    ipcRenderer.removeListener(eventName, listener)
  }
}
