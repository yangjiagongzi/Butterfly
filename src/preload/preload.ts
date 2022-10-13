import { contextBridge, ipcRenderer, clipboard } from 'electron'

contextBridge.exposeInMainWorld('api', {
  clipboardWriteText: (text: string) => {
    clipboard.writeText(text)
  },
  ipcSend: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args)
  },
  ipcInvoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },
  ipcOn: (channel: string, listener: (...args: any[]) => void) => {
    ipcRenderer.on(channel, listener)
  },
  ipcRemoveListener: (channel: string, listener: (...args: any[]) => void) => {
    ipcRenderer.removeListener(channel, listener)
  }
})
