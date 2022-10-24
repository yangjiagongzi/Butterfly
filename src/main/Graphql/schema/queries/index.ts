import { GraphQLObjectType } from 'graphql'
import { appField } from './app'
import { dictTypeField } from './dict'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    app: appField,
    dictType: dictTypeField
  }
})

export default RootQuery
