import React, { useEffect, useMemo, useState } from 'react'
import { AppTheme } from '~/renderer/styles/theme'
import { Theme } from '~/constant/app'
import { getDarkMode } from '../IPC'
import { ipcRenderer } from 'electron'
import { EventName, EventParams } from '~/constant/event'

export function useTheme() {
  const [theme, setTheme] = useState<Values<typeof Theme>>(Theme.DARK)
  const onDarkModeUpdate = (
    event: Electron.IpcRendererEvent,
    value: EventParams[typeof EventName.OnDarkModeUpdate]
  ) => {
    if (value) {
      setTheme(Theme.DARK)
    } else {
      setTheme(Theme.LIGHT)
    }
  }
  useEffect(() => {
    getDarkMode().then(result => {
      if (result) {
        setTheme(Theme.DARK)
      } else {
        setTheme(Theme.LIGHT)
      }
    })
    ipcRenderer.on(EventName.OnDarkModeUpdate, onDarkModeUpdate)
    return () => {
      ipcRenderer.removeListener(EventName.OnDarkModeUpdate, onDarkModeUpdate)
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
