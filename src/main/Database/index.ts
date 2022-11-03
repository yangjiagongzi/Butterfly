import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'

const databasePath = path.join(app.getPath('userData'), 'database.db')
console.log(databasePath)
new Database(databasePath)

const data = {
  types: [
    { id: 1, typeName: '文件上传' },
    { id: 2, typeName: 'SQL注入' }
  ],
  files: [
    {
      id: 1,
      typeId: 1,
      fileName: '脚本扩展名-ASP'
    },
    {
      id: 2,
      typeId: 1,
      fileName: '脚本扩展名-JSP'
    },
    {
      id: 3,
      typeId: 2,
      fileName: '盲注模糊测试'
    },
    {
      id: 4,
      typeId: 2,
      fileName: '万能密码登陆模糊测试'
    }
  ],
  strings: [
    {
      fileId: 1,
      strings: ['asp', 'aspx', 'asa', 'aSP', 'aSpx', 'aSa']
    },
    {
      fileId: 2,
      strings: ['jsp', 'jspx', 'jsw', 'jsv', 'jspf', 'jSp', 'jSpx']
    },
    {
      fileId: 3,
      strings: [
        '# from wapiti',
        'sleep(5)#',
        '1 or sleep(5)#',
        '" or sleep(5)#',
        // eslint-disable-next-line quotes
        "' or sleep(5)#",
        '" or sleep(5)="',
        // eslint-disable-next-line quotes
        "' or sleep(5)='"
      ]
    },
    {
      fileId: 4,
      // eslint-disable-next-line quotes
      strings: ['"', '" or "a"="a', '" or "x"="x', "admin' Or '1'!='1", 'admin" Or "1"!="2']
    }
  ]
}

export const getDictFilesByTypeId = async (typeId: number) => {
  return data.files.filter(item => item.typeId === typeId)
}

export const getDictListByFileId = async (fileId: number) => {
  return data.strings.find(item => item.fileId === fileId)?.strings || []
}

export const getAllDictType = async () => {
  return data.types
}
