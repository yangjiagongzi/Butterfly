import { ThemeMode } from './app'
import { GraphQLArgs, ExecutionResult } from 'graphql'
export const RendererSendEventName = {
  ShowMessageBox: 'showMessageBox',
  UpdateThemeMode: 'updateThemeMode'
} as const

export const RendererInvokeEventName = {
  Graphql: 'graphql',
  RequestThemeMode: 'requestThemeMode',
  RequestDarkMode: 'requestDarkMode'
} as const

export const MainSendEventName = {
  OnDarkModeUpdate: 'OnDarkModeUpdate'
} as const

export type EventParams = {
  [RendererInvokeEventName.Graphql]: Pick<GraphQLArgs, 'source' | 'variableValues'>
  [RendererSendEventName.ShowMessageBox]: string
  [RendererInvokeEventName.RequestThemeMode]: undefined
  [RendererSendEventName.UpdateThemeMode]: Values<typeof ThemeMode>
  [RendererInvokeEventName.RequestDarkMode]: undefined
  [MainSendEventName.OnDarkModeUpdate]: boolean
}

export type EventResponse = {
  [RendererInvokeEventName.Graphql]: Promise<ExecutionResult>
  [RendererInvokeEventName.RequestThemeMode]: Values<typeof ThemeMode>
  [RendererInvokeEventName.RequestDarkMode]: boolean
}
