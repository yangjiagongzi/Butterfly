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
    childs: [{ title: '通用', path: 'general' }]
  }
} as const
