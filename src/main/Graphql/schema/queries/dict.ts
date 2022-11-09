import { GraphQLList } from 'graphql'
import { getAllDictType } from '../servers/dict'
import { DictTypeSchema } from '../types/dict'

export const dictTypeField = {
  type: new GraphQLList(DictTypeSchema),
  async resolve() {
    return getAllDictType()
  }
}
