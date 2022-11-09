import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
  ThunkObjMap
} from 'graphql'
import { ConfigSchema, ConfigValueType } from '~/constant/config'
import { Config } from '~/type'
import { GraphQLDate } from './base'

function generateConfigFieldsType(type: Config['valueType']) {
  switch (type) {
    case ConfigValueType.Boolean:
      return GraphQLBoolean
    case ConfigValueType.Number:
      return GraphQLFloat
    case ConfigValueType.Date:
      return GraphQLDate
    default:
      break
  }
  return GraphQLString
}

function generateConfigFields() {
  const fields: ThunkObjMap<GraphQLFieldConfig<any, any>> = {}
  Object.values(ConfigSchema).forEach(item => {
    fields[item.key] = {
      type: generateConfigFieldsType(item.type)
    }
  })
  return fields
}

export const ConfigGraphQLSchema = new GraphQLObjectType({
  name: 'Config',
  fields: generateConfigFields()
})
