import React, { useMemo, useState } from 'react'
import Input from '~/renderer/component/Input'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, hexGroup } from './styles'

const HexStr = '0123456789abcdef'

function to16(str: string) {
  const str16 = '00' + parseInt(str).toString(16)
  return str16.substring(str16.length - 2)
}

const ColorConvert: React.FC = () => {
  const appTheme = useTheme()
  const [r, setR] = useState('')
  const [g, setG] = useState('')
  const [b, setB] = useState('')
  const rgbOutput = useMemo(() => {
    if (r && g && b) {
      console.log(r)
      console.log(g)
      console.log(b)
      return `#${to16(r)}${to16(g)}${to16(b)}`
    }
    return ''
  }, [r, g, b])

  const [rgbInput, setRgbInput] = useState('')
  const { calcR, calcG, calcB } = useMemo(() => {
    const length = rgbInput.length
    if (length === 3) {
      return {
        calcR: parseInt(rgbInput[0] + rgbInput[0], 16),
        calcG: parseInt(rgbInput[1] + rgbInput[1], 16),
        calcB: parseInt(rgbInput[2] + rgbInput[2], 16)
      }
    }
    if (length === 6) {
      return {
        calcR: parseInt(rgbInput.substring(0, 2), 16),
        calcG: parseInt(rgbInput.substring(2, 4), 16),
        calcB: parseInt(rgbInput.substring(4), 16)
      }
    }
    return {
      calcR: '',
      calcG: '',
      calcB: ''
    }
  }, [rgbInput])

  return (
    <div className={container(appTheme)}>
      <h3>RGB颜色值转换成十六进制颜色码:</h3>
      <div className={hexGroup(appTheme)}>
        <div className="title">输入:</div>
        <div className="items">
          <Input
            style={{ width: '50px' }}
            value={r}
            onChange={e => {
              if (e.target.value === '') {
                setR('')
                return
              }
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0 && num <= 255) {
                setR(e.target.value)
              }
            }}
          />
          ,
          <Input
            style={{ width: '50px' }}
            value={g}
            onChange={e => {
              if (e.target.value === '') {
                setG('')
                return
              }
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0 && num <= 255) {
                setG(e.target.value)
              }
            }}
          />
          ,
          <Input
            style={{ width: '50px' }}
            value={b}
            onChange={e => {
              if (e.target.value === '') {
                setB('')
                return
              }
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0 && num <= 255) {
                setB(e.target.value)
              }
            }}
          />
        </div>
      </div>
      <div className={hexGroup(appTheme)}>
        <div className="title">输出:</div>
        <div className="items">
          <Input value={rgbOutput} disabled />
        </div>
      </div>
      <h3>十六进制颜色码转换成RGB颜色值:</h3>
      <div className={hexGroup(appTheme)}>
        <div className="title">输入:</div>
        <div className="items">
          <span>#</span>
          <Input
            value={rgbInput}
            onChange={e => {
              const ipt = e.target.value
              if (ipt === '') {
                setRgbInput('')
                return
              }
              if (ipt.length > 6) {
                return
              }
              if (
                ipt.split('').every(item => {
                  return HexStr.includes(item)
                })
              ) {
                setRgbInput(e.target.value)
              }
            }}
          />
        </div>
      </div>
      <div className={hexGroup(appTheme)}>
        <div className="title">输出:</div>
        <div className="items">
          <Input style={{ width: '50px' }} value={calcR} disabled />
          ,
          <Input style={{ width: '50px' }} value={calcG} disabled />
          ,
          <Input style={{ width: '50px' }} value={calcB} disabled />
        </div>
      </div>
    </div>
  )
}

export default ColorConvert
