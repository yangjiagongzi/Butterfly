import { RendererSendEventName } from '~/constant/event'
import IPC from '../common/IPC'

export default class MessageBox {
  public show = (message: string) => {
    IPC.send(RendererSendEventName.ShowMessageBox, message)
  }
}
