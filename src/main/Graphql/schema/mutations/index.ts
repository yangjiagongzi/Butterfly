import { GraphQLObjectType, GraphQLString } from 'graphql'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    config: { type: GraphQLString }
  }
})

export default Mutation
