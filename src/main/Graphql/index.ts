import { graphql, GraphQLArgs } from 'graphql'
import { getSdk } from '~/utils/Graphql'
import schema from './schema'

export const handleGraphql = (params: Pick<GraphQLArgs, 'source' | 'variableValues'>) => {
  return graphql({
    schema,
    ...params
  })
}

export const graphqlRequester = getSdk(async (doc: string, vars?: any) => {
  const result = await handleGraphql({
    source: doc,
    variableValues: vars
  })
  return result.data as any
})
