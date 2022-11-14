import { GraphQLArgs, ExecutionResult } from 'graphql'

export const RendererInvokeEventName = {
  Graphql: 'graphql'
} as const

export const MainSendEventName = {
  OnDarkModeUpdate: 'OnDarkModeUpdate'
} as const

export type EventParams = {
  [RendererInvokeEventName.Graphql]: Pick<GraphQLArgs, 'source' | 'variableValues'>
  [MainSendEventName.OnDarkModeUpdate]: boolean
}

export type EventResponse = {
  [RendererInvokeEventName.Graphql]: Promise<ExecutionResult>
}
