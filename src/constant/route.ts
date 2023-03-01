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
        title: '字符生成器',
        path: 'codeGenerate'
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
        title: 'HTML',
        path: 'HTML'
      },
      {
        title: 'Base64',
        path: 'Base64'
      },
      {
        title: 'ASCII hex',
        path: 'ASCII'
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
