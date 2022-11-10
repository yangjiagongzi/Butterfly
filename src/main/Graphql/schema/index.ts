import { GraphQLSchema } from 'graphql'
import Mutation from './mutations'
import RootQuery from './queries'
import Types from './types'

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  types: Types
})
