export const RoutePath = {
  HOME: { path: '/' },
  INTRUDER: {
    path: '/intruder/*',
    childs: [
      {
        title: '目录遍历',
        path: 'directoryTraversal'
      },
      {
        title: '爆破',
        path: 'bruteForce'
      }
    ]
  },
  DECODER: { path: '/decoder' },
  COMPARER: { path: '/comparer' },
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
  SETTINGS: { path: '/settings' }
} as const
