import { GraphQLObjectType } from 'graphql'
import { appField } from './app'
import { configField } from './config'
import { dictTypeField } from './dict'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    app: appField,
    config: configField,
    dictType: dictTypeField
  }
})

export default RootQuery
