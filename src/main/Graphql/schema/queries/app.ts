import { app } from 'electron'
import { AppGraphQLSchema } from '../types/app'

export const appField = {
  type: AppGraphQLSchema,
  resolve: () => ({
    version: app.getVersion()
  })
}
