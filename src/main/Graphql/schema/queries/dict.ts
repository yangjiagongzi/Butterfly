import { GraphQLList } from 'graphql'
import { getAllDictType } from '~/main/Database'
import { DictTypeSchema } from '../types'

export const dictTypeField = {
  type: new GraphQLList(DictTypeSchema),
  async resolve() {
    return getAllDictType()
  }
}
