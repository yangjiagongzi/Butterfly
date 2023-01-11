export const SettingPath = {
  GENERAL: 'general',
  NOTE: 'note'
} as const

export const RoutePath = {
  HOME: { path: '/' },
  INTRUDER: { path: '/intruder' },
  OUTPUT: { path: '/output' },
  NOTE: { path: '/note' },
  OTHERTOOLS: {
    path: '/otherTools/*',
    childs: [
      {
        title: '进制转换',
        path: 'hexConvert'
      },
      {
        title: '颜色转换',
        path: 'colorConvert'
      }
    ]
  },
  SETTINGS: {
    path: '/settings/*',
    childs: [
      { title: '通用', path: SettingPath.GENERAL },
      { title: '笔记', path: SettingPath.NOTE }
    ]
  }
} as const
