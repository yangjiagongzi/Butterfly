import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { getDictFilesByTypeId, getDictListByFileId } from '../servers/dict'

export const DictFileSchema = new GraphQLObjectType<{ id: number; fileName: string }>({
  name: 'DictFile',
  fields: {
    id: {
      type: GraphQLInt
    },
    typeId: {
      type: GraphQLInt
    },
    fileName: {
      type: GraphQLString
    },
    list: {
      type: new GraphQLList(GraphQLString),
      async resolve(parent) {
        const fileId = parent.id
        return await getDictListByFileId(fileId)
      }
    }
  }
})

export const DictTypeSchema = new GraphQLObjectType<{ id: number; typeName: string }>({
  name: 'DictType',
  fields: {
    id: {
      type: GraphQLInt
    },
    typeName: {
      type: GraphQLString
    },
    files: {
      type: new GraphQLList(DictFileSchema),
      async resolve(parent) {
        const typeId = parent.id
        return await getDictFilesByTypeId(typeId)
      }
    }
  }
})
