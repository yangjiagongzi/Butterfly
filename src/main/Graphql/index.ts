import { ExecutionResult, graphql, GraphQLArgs } from 'graphql'
import { RootMutationType, RootQueryType } from '~/type/graphql'
import schema from './schema'

export const handleGraphql = <TData extends Record<string, unknown>>(
  params: Pick<GraphQLArgs, 'source' | 'variableValues'>
): Promise<ExecutionResult<TData>> => {
  return graphql({
    schema,
    ...params
  }) as Promise<ExecutionResult<TData>>
}

export const handleGraphqlQuery = (params: Pick<GraphQLArgs, 'source' | 'variableValues'>) => {
  return handleGraphql<RootQueryType>(params)
}

export const handleGraphqlMutation = (params: Pick<GraphQLArgs, 'source' | 'variableValues'>) => {
  return handleGraphql<RootMutationType>(params)
}
