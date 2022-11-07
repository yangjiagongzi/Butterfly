import { app } from 'electron'
import knex, { Knex } from 'knex'
import path from 'path'
import Config from '~/config'
import { SchemaType, TableClass, BaseValuesTypeEnum } from '~/constant/database'
import { AllTableSchemas, PropertiesType } from '../schema'

const databasePath = path.join(app.getPath('userData'), Config.get('DATABASE_PATH'))

class DB {
  private db: Knex<any, unknown[]> | undefined

  private shouldUpgradeDb = async (knexClient: Knex<any, unknown[]>, nowVersion: number) => {
    const hasAppTable = await knexClient.schema.hasTable(TableClass.APP)
    if (!hasAppTable) {
      return true
    }
    const result = await knexClient<PropertiesType[typeof TableClass.APP]>(TableClass.APP)
      .select('*')
      .where('key', 'version')
      .where('isDeleted', false)
      .first()
    if (!result) {
      return true
    }

    const oldVersion = parseInt(result.value)
    if (nowVersion > oldVersion) {
      return true
    }
    return false
  }

  private flagVersionn = async (knexClient: Knex<any, unknown[]>, version: number) => {
    await knexClient<PropertiesType[typeof TableClass.APP]>(TableClass.APP).insert({
      key: 'version',
      value: `${version}`,
      updateAt: new Date(),
      createAt: new Date(),
      isDeleted: false
    })
  }

  private createColumn = (
    table: Knex.CreateTableBuilder,
    property: SchemaType['properties'][0]
  ) => {
    let tableTmp: Knex.ColumnBuilder | null = null
    if (property.autoIncrement) {
      tableTmp = table.increments(property.name)
    } else if (property.type === BaseValuesTypeEnum.BIGINT) {
      tableTmp = table.bigInteger(property.name)
    } else if (property.type === BaseValuesTypeEnum.BLOB) {
      tableTmp = table.binary(property.name)
    } else if (property.type === BaseValuesTypeEnum.BOOLEAN) {
      tableTmp = table.boolean(property.name)
    } else if (property.type === BaseValuesTypeEnum.DATE) {
      tableTmp = table.date(property.name)
    } else if (property.type === BaseValuesTypeEnum.DATETIME) {
      tableTmp = table.datetime(property.name)
    } else if (property.type === BaseValuesTypeEnum.INTEGER) {
      tableTmp = table.integer(property.name)
    } else if (property.type === BaseValuesTypeEnum.REAL) {
      tableTmp = table.float(property.name)
    } else if (property.type === BaseValuesTypeEnum.STRING) {
      tableTmp = table.string(property.name, property.length)
    } else if (property.type === BaseValuesTypeEnum.TEXT) {
      tableTmp = table.text(property.name)
    } else if (property.type === BaseValuesTypeEnum.TIME) {
      tableTmp = table.time(property.name)
    } else if (property.type === BaseValuesTypeEnum.VARCHAR) {
      tableTmp = table.string(property.name, property.length)
    }
    if (property.unique) {
      tableTmp = tableTmp?.unique() || null
    }
    if (property.default !== undefined) {
      tableTmp?.defaultTo(property.default)
    }
  }

  private createTable = (table: Knex.CreateTableBuilder, tableSchema: SchemaType) => {
    for (const property of tableSchema.properties) {
      this.createColumn(table, property)
    }
  }

  private upgradeTable = async (
    table: Knex.CreateTableBuilder,
    loseProperties: SchemaType['properties']
  ) => {
    for (const property of loseProperties) {
      this.createColumn(table, property)
    }
  }

  private initTable = async (
    knexClient: Knex<any, unknown[]>,
    tableSchema: SchemaType,
    upgrade: boolean
  ) => {
    const has = await knexClient.schema.hasTable(tableSchema.tableName)
    if (!has) {
      await knexClient.schema.createTable(tableSchema.tableName, table => {
        if (tableSchema.primaryKey) {
          table.primary([tableSchema.primaryKey])
        }
        this.createTable(table, tableSchema)
      })
      return
    }
    if (!upgrade) {
      return
    }
    const loseProperties: SchemaType['properties'] = []
    for (const property of tableSchema.properties) {
      const hasColumt = await knexClient.schema.hasColumn(tableSchema.tableName, property.name)
      if (hasColumt) {
        continue
      }
      loseProperties.push(property)
    }
    await knexClient.schema.alterTable(tableSchema.tableName, table => {
      this.upgradeTable(table, loseProperties)
    })
  }

  private initAllTables = async (knexClient: Knex<any, unknown[]>) => {
    const nowVersion = Config.get('DATABASE_SCHEMA_VERSION')
    const shouldUpgradeDb = await this.shouldUpgradeDb(knexClient, nowVersion)
    for (const schema of AllTableSchemas) {
      await this.initTable(knexClient, schema, shouldUpgradeDb)
    }
    await this.flagVersionn(knexClient, nowVersion)
  }

  init = async () => {
    const knexClient = knex({
      client: 'better-sqlite3',
      connection: {
        filename: databasePath
      },
      useNullAsDefault: true,
      log: {
        error: (message: string) => {
          console.log('SQ Error:', message)
        }
      }
    })
    await this.initAllTables(knexClient)
    this.db = knexClient
    return knexClient
  }

  getDatabase = async () => {
    if (this.db) {
      return this.db
    }
    await this.init()
    return this.db
  }
}

export default new DB()
