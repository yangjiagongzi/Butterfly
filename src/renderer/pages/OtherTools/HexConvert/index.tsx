import React, { useMemo, useState } from 'react'
import Input from '~/renderer/component/Input'
import Radio from '~/renderer/component/Radio'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, hexGroup } from './styles'

const CommonHex = [2, 4, 8, 10, 16, 32]
const HexStr = '0123456789abcdefghijklmnopqrstuvwxyz'

const HexConvert: React.FC = () => {
  const appTheme = useTheme()
  const [from, setFrom] = useState(10)
  const [to, setTo] = useState(16)
  const [value, setValue] = useState('')
  const result = useMemo(() => {
    const result = parseInt(value, from).toString(to)
    if (result === NaN.toString()) {
      return ''
    }
    return result
  }, [from, to, value])

  return (
    <div className={container(appTheme)}>
      <h3>支持在2~36进制之间进行任意转换</h3>

      <div className={hexGroup(appTheme)}>
        <div className="title">从:</div>
        <div className="items">
          {CommonHex.map(item => (
            <Radio
              key={item}
              title={`${item}进制`}
              checked={item === from}
              onChange={() => {
                setFrom(item)
                setValue('')
              }}
            />
          ))}
          <Input
            type={'number'}
            min={2}
            max={36}
            value={from}
            onChange={e => {
              setFrom(Number(e.target.value))
              setValue('')
            }}
          />
        </div>
      </div>
      <div className={hexGroup(appTheme)}>
        <div className="title">转为:</div>
        <div className="items">
          {CommonHex.map(item => (
            <Radio
              key={item}
              title={`${item}进制`}
              checked={item === to}
              onChange={() => {
                setTo(item)
              }}
            />
          ))}
          <Input
            type={'number'}
            min={2}
            max={36}
            value={to}
            onChange={e => setTo(Number(e.target.value))}
          />
        </div>
      </div>
      <div className={hexGroup(appTheme)}>
        <div className="title">输入:</div>
        <div className="items">
          <Input
            value={value}
            onChange={e => {
              const allowCode = HexStr.substring(0, from)
              const newValue = e.target.value
              if (
                newValue.split('').every(item => {
                  return allowCode.includes(item)
                })
              ) {
                setValue(e.target.value)
              }
            }}
          />
        </div>
      </div>
      <div className={hexGroup(appTheme)}>
        <div className="title">输出:</div>
        <div className="items">
          <Input value={result} disabled />
        </div>
      </div>
    </div>
  )
}

export default HexConvert
