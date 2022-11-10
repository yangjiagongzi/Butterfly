import { app } from 'electron'
import { GraphQLObjectType, GraphQLString } from 'graphql'

const AppQuerySchema = new GraphQLObjectType({
  name: 'AppQuery',
  fields: {
    version: {
      type: GraphQLString
    }
  }
})

export const appField = {
  type: AppQuerySchema,
  resolve: () => ({
    version: app.getVersion()
  })
}
