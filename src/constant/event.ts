import { ThemeMode } from './app'

export const EventName = {
  ShowMessageBox: 'showMessageBox',
  RequestThemeMode: 'requestThemeMode',
  UpdateThemeMode: 'updateThemeMode',
  RequestDarkMode: 'requestDarkMode',
  OnDarkModeUpdate: 'OnDarkModeUpdate'
} as const

export type EventParams = {
  [EventName.ShowMessageBox]: string
  [EventName.RequestThemeMode]: undefined
  [EventName.UpdateThemeMode]: Values<typeof ThemeMode>
  [EventName.RequestDarkMode]: undefined
  [EventName.OnDarkModeUpdate]: boolean
}

export type EventResponse = {
  [EventName.ShowMessageBox]: void
  [EventName.RequestThemeMode]: Values<typeof ThemeMode>
  [EventName.UpdateThemeMode]: void
  [EventName.RequestDarkMode]: boolean
  [EventName.OnDarkModeUpdate]: void
}
