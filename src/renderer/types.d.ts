declare interface Window {
  api: {
    clipboardWriteText: (text: string) => void
    ipcSend(channel: string, ...args: any[]): void
    ipcInvoke(channel: string, ...args: any[]): Promise<any>
    ipcOn(channel: string, listener: (...args: any[]) => void): void
    ipcRemoveListener(channel: string, listener: (...args: any[]) => void): void
  }
}
