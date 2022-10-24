import { app } from 'electron'
import { AppSchema } from '../types'

export const appField = {
  type: AppSchema,
  resolve: () => ({
    version: app.getVersion()
  })
}
