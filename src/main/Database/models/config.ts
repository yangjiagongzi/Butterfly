import { TableClass } from '~/constant/database'
import { PropertiesType } from '../schema'
import database from '../sqlite'

export const getAllConfig = async () => {
  const db = await database.getDatabase()

  const result = await db<PropertiesType[typeof TableClass.CONFIG]>(TableClass.CONFIG)
    .select('*')
    .where('isDeleted', false)
  return result || []
}
