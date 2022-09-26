export const EventName = {
  ShowMessageBox: 'showMessageBox'
} as const

export type EventParams = {
  [EventName.ShowMessageBox]: string
}
