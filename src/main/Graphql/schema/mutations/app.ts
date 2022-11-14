import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { showMessageBox, clipboardWriteText } from '../servers/app'
import { MutationResultSchema } from './mutation-result'

const showMessageBoxField: GraphQLFieldConfig<any, any, { message: string }> = {
  type: MutationResultSchema,
  args: {
    message: {
      type: GraphQLString
    }
  },
  resolve: async (source: any, { message }: { message: string }) => {
    showMessageBox(message)
  }
}

const clipboardWriteTextField: GraphQLFieldConfig<any, any, { text: string }> = {
  type: MutationResultSchema,
  args: {
    text: {
      type: GraphQLString
    }
  },
  resolve: async (source: any, { text }: { text: string }) => {
    clipboardWriteText(text)
  }
}

const AppMutationSchema = new GraphQLObjectType({
  name: 'AppMutation',
  fields: {
    showMessageBox: showMessageBoxField,
    clipboardWriteText: clipboardWriteTextField
  }
})

export const appField = {
  type: AppMutationSchema,
  resolve() {
    return {}
  }
}
