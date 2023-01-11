import fs from 'fs'

export const isDri = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    return { exists: false, errorMsg: `directory: ${dirPath} doesn't exist!` }
  }
  const stat = fs.lstatSync(dirPath)
  if (stat.isDirectory()) {
    return { exists: true }
  } else {
    return { exists: false, errorMsg: `directory: ${dirPath} is not a folder!` }
  }
}
