import { app, nativeTheme } from 'electron'
import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'

const AppQuerySchema = new GraphQLObjectType({
  name: 'AppQuery',
  fields: {
    version: {
      type: GraphQLString
    },
    themeMode: {
      type: GraphQLString
    },
    isDarkMode: {
      type: GraphQLBoolean
    }
  }
})

export const appField = {
  type: AppQuerySchema,
  resolve: () => ({
    version: app.getVersion(),
    themeMode: nativeTheme.themeSource,
    isDarkMode: nativeTheme.shouldUseDarkColors
  })
}
