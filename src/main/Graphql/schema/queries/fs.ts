import { GraphQLBoolean, GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { isDri } from '~/main/Servers/fs'

const isDirField: GraphQLFieldConfig<any, any, { dirPath: string }> = {
  type: new GraphQLObjectType({
    name: 'FsIsDirQuery',
    fields: {
      exists: {
        type: GraphQLBoolean
      },
      errorMsg: {
        type: GraphQLString
      }
    }
  }),
  args: {
    dirPath: {
      type: GraphQLString
    }
  },
  resolve: (source: any, { dirPath }: { dirPath: string }) => {
    return isDri(dirPath)
  }
}
const FsQuerySchema = new GraphQLObjectType({
  name: 'FsQuery',
  fields: {
    isDir: isDirField
  }
})

export const fsField = {
  type: FsQuerySchema,
  resolve() {
    return {}
  }
}
