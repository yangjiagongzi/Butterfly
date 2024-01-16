import React, { useState } from 'react'
import Button from '~/renderer/component/Button'
import Textarea from '~/renderer/component/Textarea'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, paramGroup } from './styles'
import Radio from '~/renderer/component/Radio'

const URL: React.FC = () => {
  const appTheme = useTheme()
  const [text, setText] = useState<string>('')
  const [useEncodeURI, setUseEncodeURI] = useState(true)
  const [result, setResult] = useState<string>('')

  const encodeAndDecode = () => {
    const func = useEncodeURI ? encodeURI : encodeURIComponent
    setResult(func(text))
  }

  const decodeAndDecode = () => {
    const func = useEncodeURI ? decodeURI : decodeURIComponent
    setResult(func(text))
  }

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">目标字符串:</div>
        <div className="items">
          <Textarea
            value={text}
            spellCheck={false}
            onChange={e => {
              setText(e.target.value)
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">转码规则:</div>
        <div className="items">
          <Radio
            title={'转码   ;   ,   /   ?   :   @   &   =   +   $   #'}
            checked={!useEncodeURI}
            onChange={() => {
              setUseEncodeURI(!useEncodeURI)
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">结果:</div>
        <div className="items">
          <Textarea value={result} spellCheck={false} disabled />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <Button onClick={encodeAndDecode} title="加密" />
        <Button onClick={decodeAndDecode} title="解密" />
      </div>
    </div>
  )
}

export default URL
