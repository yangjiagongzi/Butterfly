import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { getAllDictType, getDictFilesByTypeId, getDictListByFileId } from '../servers/dict'

const DictFileQuerySchema = new GraphQLObjectType<{ id: number; fileName: string }>({
  name: 'DictFileQuery',
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

const DictTypeQuerySchema = new GraphQLObjectType<{ id: number; typeName: string }>({
  name: 'DictTypeQuery',
  fields: {
    id: {
      type: GraphQLInt
    },
    typeName: {
      type: GraphQLString
    },
    files: {
      type: new GraphQLList(DictFileQuerySchema),
      async resolve(parent) {
        const typeId = parent.id
        return await getDictFilesByTypeId(typeId)
      }
    }
  }
})

export const dictTypeField = {
  type: new GraphQLList(DictTypeQuerySchema),
  async resolve() {
    return getAllDictType()
  }
}
