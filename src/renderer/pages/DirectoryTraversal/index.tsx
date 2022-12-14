import React, { useState } from 'react'
import Button from '~/renderer/component/Button'
import Input from '~/renderer/component/Input'
import List from '~/renderer/component/List'
import { useTheme } from '~/renderer/component/UseTheme'
import { generateDirectoryTraversalKeys } from '~/utils/DirectoryTraversal'
import { container, paramGroup, resultListContainer } from './styles'

const DirectoryTraversal: React.FC = () => {
  const appTheme = useTheme()
  const [fileName, setFileName] = useState('')
  const [extName, setExtName] = useState('')
  const [maxLevel, setMaxLevel] = useState(3)
  const [fileNameError, setFileNameError] = useState(false)
  const [resultList, setResultList] = useState<string[]>([])
  const [submitKey, setSubmitKey] = useState(Date.now())

  const start = () => {
    setSubmitKey(Date.now())
    if (!fileName) {
      setFileNameError(true)
      setResultList([])
      return
    }
    const result = generateDirectoryTraversalKeys(fileName, maxLevel, extName)
    setResultList(result)
  }

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">文件名:</div>
        <div className="items">
          <Input
            key={submitKey}
            error={fileNameError}
            value={fileName}
            onChange={e => {
              setFileNameError(false)
              setFileName(e.target.value)
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">文件扩展名:</div>
        <div className="items">
          <Input
            value={extName}
            onChange={e => {
              setExtName(e.target.value)
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">文件最大深度:</div>
        <div className="items">
          <Input
            type={'number'}
            min={1}
            max={10}
            value={maxLevel}
            onChange={e => setMaxLevel(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <Button onClick={start} title="枚举" />
      </div>
      {resultList.length ? (
        <div className={resultListContainer(appTheme)}>
          <List data={resultList} />
        </div>
      ) : null}
    </div>
  )
}

export default DirectoryTraversal
