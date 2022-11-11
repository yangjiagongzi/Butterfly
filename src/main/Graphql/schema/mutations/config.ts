import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { updateConfig, UpdateConfigArgs } from '../servers/config'
import { GraphQLConfigValueType } from '../types/config'
import { MutationResultSchema } from './mutation-result'

const updateConfigFields: GraphQLFieldConfig<any, any, UpdateConfigArgs> = {
  type: MutationResultSchema,
  args: {
    key: {
      type: GraphQLString
    },
    value: {
      type: GraphQLConfigValueType
    }
  },
  resolve: async (source: any, args: UpdateConfigArgs) => {
    return updateConfig(args)
  }
}

const ConfigMutationSchema = new GraphQLObjectType({
  name: 'ConfigMutation',
  fields: {
    updateConfig: updateConfigFields
  }
})

export const configField = {
  type: ConfigMutationSchema,
  resolve() {
    return {}
  }
}
