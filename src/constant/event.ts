import { ThemeMode } from './app'

export const RendererSendEventName = {
  ShowMessageBox: 'showMessageBox',
  UpdateThemeMode: 'updateThemeMode'
} as const

export const RendererInvokeEventName = {
  RequestThemeMode: 'requestThemeMode',
  RequestDarkMode: 'requestDarkMode'
} as const

export const MainSendEventName = {
  OnDarkModeUpdate: 'OnDarkModeUpdate'
} as const

export type EventParams = {
  [RendererSendEventName.ShowMessageBox]: string
  [RendererInvokeEventName.RequestThemeMode]: undefined
  [RendererSendEventName.UpdateThemeMode]: Values<typeof ThemeMode>
  [RendererInvokeEventName.RequestDarkMode]: undefined
  [MainSendEventName.OnDarkModeUpdate]: boolean
}

export type EventResponse = {
  [RendererSendEventName.ShowMessageBox]: void
  [RendererInvokeEventName.RequestThemeMode]: Values<typeof ThemeMode>
  [RendererSendEventName.UpdateThemeMode]: void
  [RendererInvokeEventName.RequestDarkMode]: boolean
  [MainSendEventName.OnDarkModeUpdate]: void
}
