import React, { useEffect, useMemo, useState } from 'react'
import { Theme } from '~/constant/app'
import { MainSendEventName } from '~/constant/event'
import { AppTheme } from '~/renderer/styles/theme'

let themeInit: Values<typeof Theme> = Theme.LIGHT

window.service.Theme.isDarkMode().then(result => {
  if (result) {
    themeInit = Theme.DARK
  } else {
    themeInit = Theme.LIGHT
  }
})

export function useTheme() {
  const [theme, setTheme] = useState<Values<typeof Theme>>(themeInit)
  const onDarkModeUpdate = (event: Electron.IpcRendererEvent, value: boolean) => {
    if (value) {
      setTheme(Theme.DARK)
      themeInit = Theme.DARK
    } else {
      setTheme(Theme.LIGHT)
      themeInit = Theme.LIGHT
    }
  }
  useEffect(() => {
    window.service.IpcEvent.on(MainSendEventName.OnDarkModeUpdate, onDarkModeUpdate)
    return () => {
      window.service.IpcEvent.removeListener(MainSendEventName.OnDarkModeUpdate, onDarkModeUpdate)
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
