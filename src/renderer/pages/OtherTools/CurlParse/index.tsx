import React, { useEffect, useState } from 'react'
import Button from '~/renderer/component/Button'
import Notification from '~/renderer/component/Notification'
import Textarea from '~/renderer/component/Textarea'
import { useTheme } from '~/renderer/component/UseTheme'
import { parseFunc } from '~/utils/Request/curlParse'
import { container, paramGroup } from './styles'
import { RequestMeth } from '~/constant/intruder'

const withoutDataMethod = [
  RequestMeth.get,
  RequestMeth.delete,
  RequestMeth.head,
  RequestMeth.options
]

const CurlParse: React.FC = () => {
  const appTheme = useTheme()
  const [text, setText] = useState<string>('')
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    if (!text.trim()) {
      return
    }
    try {
      const parse = parseFunc(text)
      if (
        !parse ||
        !parse.method ||
        !Object.values(RequestMeth).includes(parse.method.toLocaleUpperCase())
      ) {
        Notification.show({ message: '解析失败! 不支持的 http method.', error: true })
        return
      }
      const hasDataField = !withoutDataMethod.includes(parse.method.toLocaleUpperCase())
      const jsString = `
import axios from "axios";

async function send() {
  return await axios.${parse.method.toLocaleLowerCase()}(
    "${parse.url}",${hasDataField ? `\n${JSON.stringify(parse.body)},` : ''}
    {
      headers: ${JSON.stringify(parse.header)},
    }
  );
}
      `
      setResult(jsString)
    } catch (err) {
      Notification.show({ message: '解析失败!', error: true })
    }
  }, [text])

  const copy = async () => {
    await window.Graphql.ClipboardWriteText({ text: result })
    Notification.show({ message: '复制成功!' })
  }

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">Curl命令:</div>
        <div className="items">
          <Textarea
            value={text}
            spellCheck={false}
            rows={4}
            onChange={e => {
              setText(e.target.value)
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">Js代码:</div>
        <div className="items">
          <Textarea value={result} spellCheck={false} disabled rows={15} />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <Button onClick={() => copy()} title="复制" />
      </div>
    </div>
  )
}

export default CurlParse
