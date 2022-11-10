import { ConfigKey, ConfigValue } from '~/constant/config'
import { getAllConfig } from '~/main/Database/models/config'
import { formatConfigWithDefaultValue } from '~/utils/Config'

export const getConfig = async () => {
  const allConfig = await getAllConfig()
  return formatConfigWithDefaultValue(allConfig)
}

export type UpdateConfigArgs<K extends ConfigKey = ConfigKey> = {
  key: K
  value: ConfigValue<K>
}

export const updateConfig = async ({ key, value }: UpdateConfigArgs) => {
  console.log('^^^^^^^^^^^^^^^^^^^^^^')
  console.log(key)
  console.log(value)
  console.log('^^^^^^^^^^^^^^^^^^^^^^')
  return {
    status: 200,
    message: 'success'
  }
}
