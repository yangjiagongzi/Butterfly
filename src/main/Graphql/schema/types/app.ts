import { GraphQLObjectType, GraphQLString } from 'graphql'

export const AppGraphQLSchema = new GraphQLObjectType({
  name: 'App',
  fields: {
    version: {
      type: GraphQLString
    }
  }
})
