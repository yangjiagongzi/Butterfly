import { ConfigKey, ConfigValue } from '~/constant/config'
import { TableClass } from '~/constant/database'
import { configStringify } from '~/utils/Config'
import { PropertiesType } from '../schema'
import database from '../sqlite'

export const getAllConfig = async () => {
  const db = await database.getDatabase()

  const result = await db<PropertiesType[typeof TableClass.CONFIG]>(TableClass.CONFIG)
    .select('*')
    .where('isDeleted', false)
  return result || []
}

export const upsertConfig = async <K extends ConfigKey>(key: K, value: ConfigValue<K>) => {
  const db = await database.getDatabase()
  const stringify = configStringify(value)
  const result = await db<PropertiesType[typeof TableClass.CONFIG]>(TableClass.CONFIG)
    .where('isDeleted', false)
    .where('key', key)
    .update('value', stringify.value)
    .update('valueType', stringify.valueType)
    .update('updateAt', new Date(), ['id'])
  if (result.length) {
    return true
  }
  await db<PropertiesType[typeof TableClass.CONFIG]>(TableClass.CONFIG).insert({
    key: key,
    value: stringify.value,
    valueType: stringify.valueType,
    updateAt: new Date(),
    createAt: new Date(),
    isDeleted: false
  })
  return true
}
