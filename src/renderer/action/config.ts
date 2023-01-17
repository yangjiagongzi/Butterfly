import { ConfigKey, ConfigValue } from '~/constant/config'
import { Dispatch, GetState } from '~/type/redux'
import { EventListener } from '~/utils/EventListener'

class ConfigReduxAction {
  constructor() {
    window.ConfigEvent.addListener(this.onConfigChange)
  }

  private listenerMaping = new EventListener()

  private onConfigChange = (
    event: Electron.IpcRendererEvent,
    value: { key: ConfigKey; value: ConfigValue<ConfigKey> }
  ) => {
    this.listenerMaping.emitEvent(value.key, value.value)
  }

  addListener = <K extends ConfigKey>(key: K, callback: (value: ConfigValue<K>) => void) => {
    return (dispatch: Dispatch, getState: GetState) => {
      this.listenerMaping.addEventListener(key, callback)
    }
  }

  removeListener = <K extends ConfigKey>(key: K, callback: (value: ConfigValue<K>) => void) => {
    return (dispatch: Dispatch, getState: GetState) => {
      this.listenerMaping.removeEventListener(key, callback)
    }
  }
}

export default new ConfigReduxAction()
