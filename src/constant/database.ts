export const TableClass = {
  APP: 'App',
  CONFIG: 'Config'
} as const

export const BaseValuesTypeEnum = {
  BIGINT: 'BIGINT',
  BLOB: 'BLOB',
  BOOLEAN: 'BOOLEAN',
  // CHAR: 'CHAR',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  // DECIMAL: 'DECIMAL',
  // DOUBLE: 'DOUBLE',
  INTEGER: 'INTEGER',
  // INT: 'INT',
  // NONE: 'NONE',
  // NUMERIC: 'NUMERIC',
  REAL: 'REAL',
  STRING: 'STRING',
  TEXT: 'TEXT',
  TIME: 'TIME',
  VARCHAR: 'VARCHAR'
} as const

export type SchemaType = {
  tableName: Values<typeof TableClass>
  primaryKey?: string
  properties: Array<{
    name: string
    type: Values<typeof BaseValuesTypeEnum>
    autoIncrement?: boolean
    unique?: boolean
    default?: any
    length?: number
  }>
}
