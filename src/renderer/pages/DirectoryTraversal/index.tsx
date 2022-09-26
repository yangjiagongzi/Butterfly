import React, { useState } from 'react'
import Input from '~/renderer/component/Input'
import Button from '~/renderer/component/Button'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { container, paramGroup, resultListContainer, resultItem } from './styles'
import { generateDirectoryTraversalKeys } from '~/utils/DirectoryTraversal'

type Props = {
  appTheme: AppTheme
}

const HexConvert: React.FC<Props> = ({ appTheme }: Props) => {
  const [fileName, setFileName] = useState('')
  const [extName, setExtName] = useState('')
  const [maxLevel, setMaxLevel] = useState(3)
  const [fileNameError, setFileNameError] = useState(false)
  const [resultList, setResultList] = useState<string[]>([])

  const start = () => {
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
            error={fileNameError}
            appTheme={appTheme}
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
            appTheme={appTheme}
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
            appTheme={appTheme}
            type={'number'}
            min={1}
            max={10}
            value={maxLevel}
            onChange={e => setMaxLevel(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <Button appTheme={appTheme} onClick={start} title="开始" />
      </div>
      {resultList.length ? (
        <div className={resultListContainer(appTheme)}>
          <ul>
            {resultList.map(key => (
              <li className={resultItem(appTheme)} key={key}>
                {key}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default HexConvert
