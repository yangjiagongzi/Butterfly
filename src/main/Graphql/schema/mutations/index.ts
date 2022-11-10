import { GraphQLObjectType } from 'graphql'
import { configField } from './config'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    config: configField
  }
})

export default Mutation
