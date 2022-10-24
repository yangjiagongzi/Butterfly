import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import app from './app'

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      app
    }
  })
})
