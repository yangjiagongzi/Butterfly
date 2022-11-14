import React, { useEffect, useMemo, useState } from 'react'
import { Theme, ThemeMode } from '~/constant/app'
import { AppTheme } from '~/renderer/styles/theme'
import { getAppInfo } from '~/utils/GraphqlString/app'

let themeInit: Values<typeof Theme> = Theme.LIGHT

const isDarkMode = async () => {
  const getAppInfoQuery = getAppInfo()
  const appInfo = await window.service.graphql(getAppInfoQuery)
  const { isDarkMode } = appInfo.data?.app as {
    version: string
    themeMode: Values<typeof ThemeMode>
    isDarkMode: boolean
  }
  return isDarkMode
}

isDarkMode().then(result => {
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
    window.service.ThemeEvent.addListener(onDarkModeUpdate)
    return () => {
      window.service.ThemeEvent.removeListener(onDarkModeUpdate)
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
