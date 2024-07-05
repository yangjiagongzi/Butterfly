export const SettingPath = {
  GENERAL: 'general',
  NOTE: 'note'
} as const

export const RoutePath = {
  HOME: { path: '/' },
  INTRUDER: { path: '/intruder' },
  OUTPUT: { path: '/output' },
  DICTIONARY: {
    path: '/Dictionary/*',
    childs: [
      {
        title: '数字',
        path: 'numbers'
      },
      {
        title: '日期',
        path: 'dates'
      },
      {
        title: '目录生成器',
        path: 'directoryTraversal'
      }
    ]
  },
  DECODER: {
    path: '/decoder/*',
    childs: [
      {
        title: 'URL',
        path: 'URL'
      },
      {
        title: 'Base64',
        path: 'Base64'
      },
      {
        title: '凯撒变换',
        path: 'Caesar'
      }
    ]
  },
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
      },
      {
        title: 'IP地址计算器',
        path: 'subnetmask'
      },
      {
        title: 'Curl解析',
        path: 'curlParse'
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
