import React, { useState } from 'react'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, configGroup } from './styles'
import Input from '~/renderer/component/Input'

const IP: React.FC = () => {
  const appTheme = useTheme()
  const [ip, setIp] = useState([192, 168, 0, 1])
  const [mask, setMask] = useState(24)
  const onChangeIp = (value: string, index: number) => {
    const num = Number(value)
    if (Number.isNaN(num) || num < 0 || num > 255) {
      return
    }
    const newArr = [...ip]
    newArr[index] = num
    setIp(newArr)
  }
  return (
    <div className={container(appTheme)}>
      <div className={configGroup(appTheme)}>
        <div className="title">IP:</div>
        <div className="items">
          {ip.map((item, index) => (
            <>
              {index !== 0 ? '  .  ' : ''}
              <Input
                className="fix-width"
                value={item}
                onChange={e => onChangeIp(e.target.value, index)}
              />
            </>
          ))}
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <div className="title">掩码位:</div>
        <div className="items">
          <Input
            className="fix-width"
            value={mask}
            onChange={e => {
              if (e.target.value === '') {
                setMask(24)
                return
              }
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0 && num <= 32) {
                setMask(num)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default IP
