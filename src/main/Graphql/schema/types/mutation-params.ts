import { GraphQLBoolean, GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql'
import { GraphQLDate } from './date'

export const UpdateConfigParams = new GraphQLObjectType({
  name: 'UpdateConfigParams',
  fields: {
    key: {
      type: GraphQLString
    },
    value: {
      type: GraphQLString || GraphQLBoolean || GraphQLFloat || GraphQLDate
    }
  }
})
