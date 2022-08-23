import React, { useMemo, useState } from 'react'
import Radio from '~/renderer/component/Radio'
import Input from '~/renderer/component/Input'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { container, hexGroup } from './styles'

const CommonHex = [2, 4, 8, 10, 16, 32]
const HexStr = '0123456789abcdefghijklmnopqrstuvwxyz'

type Props = {
  appTheme: AppTheme
}

const HexConvert: React.FC<Props> = ({ appTheme }: Props) => {
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
              key={`${item}`}
              title={`${item}进制`}
              checked={item === from}
              appTheme={appTheme}
              onChange={() => {
                setFrom(item)
                setValue('')
              }}
            />
          ))}
          <Input
            appTheme={appTheme}
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
              key={`${item}`}
              title={`${item}进制`}
              checked={item === to}
              appTheme={appTheme}
              onChange={() => {
                setTo(item)
              }}
            />
          ))}
          <Input
            appTheme={appTheme}
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
            appTheme={appTheme}
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
          <Input appTheme={appTheme} value={result} disabled />
        </div>
      </div>
    </div>
  )
}

export default HexConvert
