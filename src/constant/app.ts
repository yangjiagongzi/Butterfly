export const Theme = {
  DARK: 'dark',
  LIGHT: 'light'
} as const

export const ThemeMode = {
  DARK: 'dark',
  LIGHT: 'light',
  AUTO: 'system'
} as const

export const ThemeOptionsName = {
  [ThemeMode.DARK]: { id: ThemeMode.DARK, name: '深色' },
  [ThemeMode.LIGHT]: { id: ThemeMode.LIGHT, name: '浅色' },
  [ThemeMode.AUTO]: { id: ThemeMode.AUTO, name: '跟随系统' }
} as const
