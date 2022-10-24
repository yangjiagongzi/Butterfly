import { graphql, GraphQLArgs } from 'graphql'
import { schema } from './schema'

export const handleGraphql = (params: Pick<GraphQLArgs, 'source' | 'variableValues'>) => {
  return graphql({
    schema,
    ...params
  })
}
