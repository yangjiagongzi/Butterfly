import React, { useState } from 'react'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, configGroup } from './styles'
import Input from '~/renderer/component/Input'
import { resolveSubnetMask } from '~/utils/IP'
import Button from '~/renderer/component/Button'

const Mask: React.FC = () => {
  const appTheme = useTheme()
  const defaultValue = resolveSubnetMask(24)
  const [binary, setBinary] = useState(defaultValue.binary)
  const [dec, setDec] = useState(defaultValue.dec)
  const [hex, setHex] = useState(defaultValue.hex)
  const [cidr, setCidr] = useState(defaultValue.cidr)
  const [canUse, setCanUse] = useState(defaultValue.canUse)
  const [canUseAll, setCanUseAll] = useState(defaultValue.canUseAll)

  const onChange = (mask: number | string[] | number[]) => {
    const resolveValue = resolveSubnetMask(
      mask as number | [string, string, string, string] | [number, number, number, number]
    )
    setBinary(resolveValue.binary)
    setDec(resolveValue.dec)
    setHex(resolveValue.hex)
    setCidr(resolveValue.cidr)
    setCanUse(resolveValue.canUse)
    setCanUseAll(resolveValue.canUseAll)
  }

  const onChangeBinary = (value: string, index: number) => {
    if (/[^01]/.test(value) || value.length > 8) {
      return
    }
    const newArr = [...binary]
    newArr[index] = value
    setBinary(newArr)
  }
  const onChangeDec = (value: string, index: number) => {
    const num = Number(value)
    if (Number.isNaN(num) || num < 0 || num > 255) {
      return
    }
    const newArr = [...dec]
    newArr[index] = num
    setDec(newArr)
  }
  const onChangeHex = (value: string, index: number) => {
    if (/[^0-9a-fA-F]/.test(value)) {
      return
    }
    const num = parseInt(value, 16)
    if (Number.isNaN(num) || num < 0 || num > 255) {
      return
    }
    const newArr = [...hex]
    newArr[index] = num.toString(16)
    setHex(newArr)
  }
  const onChangeCidr = (value: string) => {
    const num = Number(value)
    if (num > 32 || num < 0) {
      return
    }
    setCidr(num)
  }

  return (
    <div className={container(appTheme)}>
      <div className={configGroup(appTheme)}>
        <div className="title">二进制掩码:</div>
        <div className="items">
          {binary.map((item, index) => (
            <>
              {index !== 0 ? '  .  ' : ''}
              <Input
                className="fix-width"
                value={item}
                onChange={e => onChangeBinary(e.target.value, index)}
              />
            </>
          ))}
          <Button onClick={() => onChange(binary)} title="计算" />
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <div className="title">十进制掩码:</div>
        <div className="items">
          {dec.map((item, index) => (
            <>
              {index !== 0 ? '  .  ' : ''}
              <Input
                className="fix-width"
                value={item}
                onChange={e => onChangeDec(e.target.value, index)}
              />
            </>
          ))}
          <Button onClick={() => onChange(dec)} title="计算" />
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <div className="title">十六进制掩码:</div>
        <div className="items">
          {hex.map((item, index) => (
            <>
              {index !== 0 ? '  .  ' : ''}
              <Input
                className="fix-width"
                value={item}
                onChange={e => onChangeHex(e.target.value, index)}
              />
            </>
          ))}
          <Button onClick={() => onChange(hex.map(item => parseInt(item, 16)))} title="计算" />
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <div className="title">掩码位元数:</div>
        <div className="items">
          <Input className="fix-width" value={cidr} onChange={e => onChangeCidr(e.target.value)} />
          <Button onClick={() => onChange(cidr)} title="计算" />
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <div className="title">可用地址量:</div>
        <div className="items">
          <Input className="fix-width" readOnly value={canUse} />
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <div className="title">可用总量:</div>
        <div className="items">
          <Input className="fix-width" readOnly value={canUseAll} />
        </div>
      </div>
    </div>
  )
}

export default Mask