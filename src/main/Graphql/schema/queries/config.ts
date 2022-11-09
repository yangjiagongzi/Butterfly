import { getConfig } from '../servers/config'
import { ConfigGraphQLSchema } from '../types/config'

export const configField = {
  type: ConfigGraphQLSchema,
  resolve: getConfig
}
