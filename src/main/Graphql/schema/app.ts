import { app } from 'electron'
import { GraphQLObjectType, GraphQLResolveInfo, GraphQLString } from 'graphql'

export default {
  type: new GraphQLObjectType({
    name: 'App',
    fields: {
      version: {
        type: GraphQLString,
        resolve() {
          return app.getVersion()
        }
      }
    }
  }),
  resolve: (source: any, args: any, context: any, info: GraphQLResolveInfo) => info
}
