import { schema } from './schema'
import Config from '~/config'

export async function startApolloServer() {
  const serverEnable = Config.get('APOLLO_GRAPHQL_ENABLE')
  if (!serverEnable) {
    return
  }
  const port = Config.get('APOLLO_GRAPHQL_PORT')
  const { ApolloServer } = require('@apollo/server')
  const { startStandaloneServer } = require('@apollo/server/standalone')
  const server = new ApolloServer({
    schema: schema
  })
  const { url } = await startStandaloneServer(server, {
    listen: { port: port }
  })
  console.log(`🚀 Apollo Server ready at: ${url}`)
}
