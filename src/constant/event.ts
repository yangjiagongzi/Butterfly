import { ThemeMode } from './app'

export const EventName = {
  ShowMessageBox: 'showMessageBox',
  RequestThemeMode: 'requestThemeMode',
  UpdateThemeMode: 'updateThemeMode'
} as const

export type EventParams = {
  [EventName.ShowMessageBox]: string
  [EventName.RequestThemeMode]: undefined
  [EventName.UpdateThemeMode]: Values<typeof ThemeMode>
}

export type EventResponse = {
  [EventName.ShowMessageBox]: void
  [EventName.RequestThemeMode]: Values<typeof ThemeMode>
  [EventName.UpdateThemeMode]: void
}
