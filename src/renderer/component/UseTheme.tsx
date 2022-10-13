import React, { useEffect, useMemo, useState } from 'react'
import { AppTheme } from '~/renderer/styles/theme'
import { Theme } from '~/constant/app'
import { getDarkMode } from '../IPC'
import { EventName, EventParams } from '~/constant/event'

let themeInit: Values<typeof Theme> = Theme.LIGHT

getDarkMode().then(result => {
  if (result) {
    themeInit = Theme.DARK
  } else {
    themeInit = Theme.LIGHT
  }
})

export function useTheme() {
  const [theme, setTheme] = useState<Values<typeof Theme>>(themeInit)
  const onDarkModeUpdate = (
    event: Electron.IpcRendererEvent,
    value: EventParams[typeof EventName.OnDarkModeUpdate]
  ) => {
    if (value) {
      setTheme(Theme.DARK)
      themeInit = Theme.DARK
    } else {
      setTheme(Theme.LIGHT)
      themeInit = Theme.LIGHT
    }
  }
  useEffect(() => {
    window.api.ipcOn(EventName.OnDarkModeUpdate, onDarkModeUpdate)
    return () => {
      window.api.ipcRemoveListener(EventName.OnDarkModeUpdate, onDarkModeUpdate)
    }
  }, [])

  return useMemo(() => AppTheme(theme), [theme])
}

export function withTheme<P>(Component: React.ComponentType<P>) {
  type TodoPreview = Omit<P, 'appTheme'>

  return React.forwardRef((props: TodoPreview, ref) => {
    const theme = useTheme()
    return <Component ref={ref} {...(props as P)} appTheme={theme} />
  })
}
