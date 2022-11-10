import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

export const MutationResultSchema = new GraphQLObjectType({
  name: 'MutationResult',
  fields: {
    status: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLString
    }
  }
})
