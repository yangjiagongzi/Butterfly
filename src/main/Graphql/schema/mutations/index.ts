import { GraphQLObjectType } from 'graphql'
import { appField } from './app'
import { configField } from './config'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    app: appField,
    config: configField
  }
})

export default Mutation
