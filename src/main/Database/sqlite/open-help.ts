import Database from 'better-sqlite3'
import Config from '~/config'
import { SchemaType, TableClass } from '~/constant/database'
import Log from '~/utils/Log'
import DatabaseHelp from '../help'
import { AllTableSchemas, PropertiesType } from '../schema'

const TableName = TableClass.APP
type App = PropertiesType[typeof TableName]

class DatabaseOpenHelp {
  private shouldUpdataDb = async (db: Database.Database, nowVersion: number) => {
    try {
      const hasAppTable = await DatabaseHelp.hasTable(db, TableClass.APP)
      if (!hasAppTable) {
        return true
      }

      const stmt = db.prepare<{ key: string; isDeleted: 0 | 1 }>(
        `SELECT * FROM ${TableClass.APP} WHERE key = $key AND isDeleted = $isDeleted`
      )
      const result: App = stmt.get({
        key: 'schemaVersion',
        isDeleted: 0
      })

      if (!result) {
        return true
      }

      const oldVersion = parseInt(result.value)
      if (nowVersion > oldVersion) {
        return true
      }
      return false
    } catch (err: any) {
      Log.error(`DatabaseOpenHelp => shouldUpdataDb: ${err.message}`)
      return true
    }
  }

  private flagVersionn = async (db: Database.Database, version: number) => {
    try {
      const stmt = db.prepare<{ key: string; isDeleted: 0 | 1 }>(
        `SELECT * FROM ${TableClass.APP} WHERE key = $key AND isDeleted = $isDeleted`
      )
      const result: App = stmt.get({
        key: 'schemaVersion',
        isDeleted: 0
      })
      const upsertData = {
        key: 'schemaVersion',
        value: `${version}`,
        updateAt: new Date().getTime(),
        createAt: new Date().getTime(),
        isDeleted: 0
      } as const
      if (result) {
        const updateStmt = db.prepare<
          {
            id: number
          } & Pick<App, 'value' | 'updateAt'>
        >(`UPDATE ${TableName} set value = $value, updateAt = $updateAt WHERE id = $id`)
        updateStmt.run({ id: result.id, ...upsertData })
      } else {
        const insertStmt = db.prepare<Omit<App, 'id'>>(
          `INSERT INTO ${TableName} (key, value, updateAt, createAt, isDeleted) VALUES ($key, $value, $updateAt, $createAt, $isDeleted)`
        )
        insertStmt.run(upsertData)
      }
    } catch (err: any) {
      Log.error(`DatabaseOpenHelp => flagVersionn: ${err.message}`)
    }
  }

  private initTable = async (db: Database.Database, tableSchema: SchemaType) => {
    try {
      await DatabaseHelp.createTable(db, tableSchema)
    } catch (err: any) {
      Log.error(`DatabaseOpenHelp => initTable: ${err.message}`)
    }
  }

  initAllTables = async (db: Database.Database) => {
    const nowVersion = Config.get('DATABASE_SCHEMA_VERSION')
    const update = await this.shouldUpdataDb(db, nowVersion)
    if (update) {
      for (const schema of AllTableSchemas) {
        await this.initTable(db, schema)
      }
    }
    await this.flagVersionn(db, nowVersion)
  }
}

export default new DatabaseOpenHelp()
