import React, { useState } from 'react'
import { nonStandardEncode2byte, nonStandardEncode3byte } from '~/constant/dictionary'
import Button from '~/renderer/component/Button'
import Input from '~/renderer/component/Input'
import List from '~/renderer/component/List'
import Radio from '~/renderer/component/Radio'
import { useTheme } from '~/renderer/component/UseTheme'
import { payloadGenerateForDirectoryTraversal } from '~/utils/PayloadGenerate'
import { container, paramGroup, resultListContainer } from './styles'

const DirectoryTraversal: React.FC = () => {
  const appTheme = useTheme()
  const [fileName, setFileName] = useState('')
  const [extName, setExtName] = useState('')
  const [maxLevel, setMaxLevel] = useState(3)
  const [params, setParams] = useState({
    skipExtensionCheck: false,
    encodeURI: true,
    doubleEncodeURI: true,
    doubleWrite: true,
    isLinux: true,
    nonStandardEncode1: true,
    nonStandardEncode2: true,
    nonStandardEncode3: true
  })
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
    const generator = payloadGenerateForDirectoryTraversal({
      fileName,
      maxLevel,
      extName,
      ...params
    })
    setResultList(generator.showList)
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
        <div className="title">字符规则:</div>
        <div className="items">
          <Radio
            title={'空字节绕过扩展名验证'}
            checked={params.skipExtensionCheck}
            onChange={() => {
              setParams({ ...params, skipExtensionCheck: !params.skipExtensionCheck })
            }}
          />
          <Radio
            title={'URL编码'}
            checked={params.encodeURI}
            onChange={() => {
              const newValue = !params.encodeURI
              setParams({
                ...params,
                encodeURI: newValue,
                doubleEncodeURI: newValue && params.doubleEncodeURI
              })
            }}
          />
          <Radio
            title={'双重URL编码'}
            checked={params.doubleEncodeURI}
            onChange={() => {
              const newValue = !params.doubleEncodeURI
              setParams({
                ...params,
                encodeURI: params.encodeURI || newValue,
                doubleEncodeURI: newValue
              })
            }}
          />
          <Radio
            title={'双写'}
            checked={params.doubleWrite}
            onChange={() => {
              setParams({
                ...params,
                doubleWrite: !params.doubleWrite
              })
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">文件路径分隔符:</div>
        <div className="items">
          <Radio
            title={'/ (linux)'}
            checked={params.isLinux}
            onChange={() => {
              setParams({
                ...params,
                isLinux: true
              })
            }}
          />
          <Radio
            title={'\\ (windows)'}
            checked={!params.isLinux}
            onChange={() => {
              setParams({
                ...params,
                isLinux: false
              })
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">非法字符替换:</div>
        <div className="items">
          <Radio
            title={`2字节非法字符替换: ${params.isLinux ? '/' : '\\'} => ${
              nonStandardEncode2byte[params.isLinux ? '/' : '\\']
            }`}
            checked={params.nonStandardEncode1}
            onChange={() => {
              setParams({
                ...params,
                nonStandardEncode1: !params.nonStandardEncode1
              })
            }}
          />
          <Radio
            title={`3字节非法字符替换: ${params.isLinux ? '/' : '\\'} => ${
              nonStandardEncode3byte[params.isLinux ? '/' : '\\']
            }`}
            checked={params.nonStandardEncode2}
            onChange={() => {
              setParams({
                ...params,
                nonStandardEncode2: !params.nonStandardEncode2
              })
            }}
          />
          <Radio
            title={'JAVA非法字符替换: . => %c0%ae'}
            checked={params.nonStandardEncode3}
            onChange={() => {
              setParams({
                ...params,
                nonStandardEncode3: !params.nonStandardEncode3
              })
            }}
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
