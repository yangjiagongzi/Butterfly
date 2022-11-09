import {
  ConfigKey,
  ConfigObject,
  ConfigSchema,
  ConfigValues,
  ConfigValueType
} from '~/constant/config'
import { Config } from '~/type'

function configParse<K extends ConfigKey>(val: Config): ConfigObject<K> {
  let value: any = val.value
  switch (val.valueType) {
    case ConfigValueType.Boolean:
      value = value === 'true' ? true : false
      break
    case ConfigValueType.Number:
      value = Number(value)
      break
    default:
      break
  }
  return { key: val.key, value, createAt: val.createAt, updateAt: val.updateAt } as ConfigObject<K>
}

export function formatConfigWithDefaultValue(configList: Config[]) {
  const configMap: Partial<Record<typeof ConfigSchema[ConfigKey]['key'], ConfigValues>> = {}
  Object.keys(ConfigSchema).forEach(key => {
    const schemaObj = ConfigSchema[key as ConfigKey]
    configMap[schemaObj.key] = schemaObj.defaultValue
  })

  for (const configItem of configList) {
    const configFormat = configParse(configItem)
    configMap[configFormat.key] = configFormat.value
  }

  return configMap as Record<typeof ConfigSchema[ConfigKey]['key'], ConfigValues>
}
