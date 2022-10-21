import { graphql, buildSchema, GraphQLArgs } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => {
    return 'Hello world!'
  }
}

export const handleGraphql = (params: Pick<GraphQLArgs, 'source' | 'variableValues'>) => {
  return graphql({
    schema,
    rootValue,
    ...params
  })
}
