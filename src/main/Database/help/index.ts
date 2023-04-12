import Database from 'better-sqlite3'
import { SchemaType, TableClass } from '~/constant/database'
import Log from '~/utils/Log'

class DatabaseHelp {
  private generateCreateTableSql = (tableSchema: SchemaType) => {
    return `
CREATE TABLE ${tableSchema.tableName} (
${tableSchema.properties
  .map(column => {
    const type = column.length ? `${column.type} (${column.length})` : column.type
    const isPrimaryKey = column.name === tableSchema.primaryKey
    const primaryKeySql = isPrimaryKey ? ' PRIMARY KEY' : ''
    const autoIncrementSql = column.autoIncrement ? ' AUTOINCREMENT' : ''
    const notNullSql = isPrimaryKey ? ' NOT NULL' : ''
    const uniqueSql = !isPrimaryKey && column.unique ? ' UNIQUE' : ''
    const defaultValueSql =
      !isPrimaryKey && column.default != undefined ? ` DEFAULT ${column.default}` : ''

    return `  ${column.name} ${type}${primaryKeySql}${autoIncrementSql}${notNullSql}${uniqueSql}${defaultValueSql},\n`
  })
  .join('')}
  UNIQUE (
      ${tableSchema.primaryKey || ''}
  )
);`
  }

  hasTable = async (db: Database.Database, tableName: Values<typeof TableClass>) => {
    try {
      const stmt = db.prepare(
        `select * from sqlite_master where type = 'table' and name = '${tableName}'`
      )
      const result = stmt.get()
      return result ? true : false
    } catch (err: any) {
      Log.error(`DatabaseHelp => hasTable: ${err.message}`)
      return false
    }
  }

  createTable = async (db: Database.Database, tableSchema: SchemaType) => {
    try {
      const createSql = this.generateCreateTableSql(tableSchema)
      const stmt = db.prepare(createSql)
      stmt.run()
    } catch (err: any) {
      Log.error(`DatabaseHelp => createTable: ${err.message}`)
    }
  }
}

export default new DatabaseHelp()
