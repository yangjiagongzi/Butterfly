import { clipboard } from 'electron'

export default class Clipboard {
  public writeText = (text: string) => {
    clipboard.writeText(text)
  }
}
