import React, { useState } from 'react'
import { LowercaseLetter } from '~/constant/dictionary'
import Button from '~/renderer/component/Button'
import Input from '~/renderer/component/Input'
import Textarea from '~/renderer/component/Textarea'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, paramGroup } from './styles'

const str = LowercaseLetter

const CaesarCipher: React.FC = () => {
  const appTheme = useTheme()
  const [text, setText] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [shift, setShift] = useState<number>(0)

  const encodeAndDecode = (encode: boolean) => {
    const offset = encode ? shift : 26 - shift
    const newStr = text
      .split('')
      .map(item => {
        const nowIdx = str.indexOf(item)
        if (nowIdx < 0) {
          return item
        }
        const newIdx = (nowIdx + offset) % 26
        return str[newIdx]
      })
      .join('')
    setResult(newStr)
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
        <div className="title">位移:</div>
        <div className="items">
          <Input
            type={'number'}
            min={0}
            max={25}
            value={shift}
            onChange={e => setShift(Number(e.target.value))}
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
        <Button onClick={() => encodeAndDecode(true)} title="加密" />
        <Button onClick={() => encodeAndDecode(false)} title="解密" />
      </div>
    </div>
  )
}

export default CaesarCipher
