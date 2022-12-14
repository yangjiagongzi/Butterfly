import { ConfigKey, ConfigValue } from '~/constant/config'
import { getAllConfig, upsertConfig } from '~/main/Database/models/config'
import { formatConfigWithDefaultValue } from '~/utils/Config'
import Application from '../Application'

export const getConfig = async () => {
  const allConfig = await getAllConfig()
  return formatConfigWithDefaultValue(allConfig)
}

export type UpdateConfigArgs<K extends ConfigKey = ConfigKey> = {
  key: K
  value: ConfigValue<K>
}

export const updateConfig = async ({ key, value }: UpdateConfigArgs<any>) => {
  await upsertConfig(key, value)
  Application.upsertConfig(key, value)
  return {
    successful: true,
    message: 'success'
  }
}
