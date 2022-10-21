import IPC from '../common/IPC'

export default class IpcEvent {
  public on = (channel: string, listener: (...args: any[]) => void) => {
    IPC.on(channel, listener)
  }

  public removeListener = (channel: string, listener: (...args: any[]) => void) => {
    IPC.removeListener(channel, listener)
  }
}
