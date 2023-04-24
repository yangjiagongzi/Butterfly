import React, { useState } from 'react'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, configGroup } from './styles'
import Input from '~/renderer/component/Input'
import Button from '~/renderer/component/Button'
import { resolveBroadcastAddress, resolveNetId, resolveSubnetMask } from '~/utils/IP'

type IpList = [number, number, number, number]
const IP: React.FC = () => {
  const appTheme = useTheme()
  const [ip, setIp] = useState<IpList>([192, 168, 0, 1])
  const [mask, setMask] = useState(24)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    canUse: number
    mask: IpList
    netAddress: IpList
    firstAddress: IpList
    lastAddress: IpList
    broadcastAddress: IpList
    onlyOne: boolean
  }>({
    canUse: 0,
    mask: [0, 0, 0, 0],
    netAddress: [0, 0, 0, 0],
    firstAddress: [0, 0, 0, 0],
    lastAddress: [0, 0, 0, 0],
    broadcastAddress: [0, 0, 0, 0],
    onlyOne: false
  })
  const onChangeIp = (value: string, index: number) => {
    const num = Number(value)
    if (Number.isNaN(num) || num < 0 || num > 255) {
      return
    }
    const newArr: IpList = [...ip]
    newArr[index] = num
    setIp(newArr)
    setShowResult(false)
  }
  const run = () => {
    const resolveValue = resolveSubnetMask(mask)
    const netAddress = resolveNetId(ip, resolveValue.dec)
    const broadcastAddress = resolveBroadcastAddress(ip, resolveValue.binary)
    const error = resolveValue.canUse <= 0
    const firstAddress = error
      ? netAddress
      : (netAddress.map((item, idx) => (idx < 3 ? item : item + 1)) as IpList)
    const lastAddress = error
      ? broadcastAddress
      : (broadcastAddress.map((item, idx) => (idx < 3 ? item : item - 1)) as IpList)
    setResult({
      canUse: resolveValue.canUse,
      mask: resolveValue.dec,
      netAddress,
      firstAddress,
      lastAddress,
      broadcastAddress,
      onlyOne: netAddress.join('') === broadcastAddress.join('')
    })
    setShowResult(true)
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
              setShowResult(false)
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0 && num <= 32) {
                setMask(num)
              }
            }}
          />
        </div>
      </div>
      <div className={configGroup(appTheme)}>
        <Button onClick={run} title="计算" />
      </div>
      {showResult ? (
        <>
          {result.canUse > 0 ? (
            <div className={configGroup(appTheme)}>
              <div className="title">可用 IP 数量:</div>
              <div className="items">
                <Input className="fix-width" value={result.canUse} readOnly />
              </div>
            </div>
          ) : null}
          <div className={configGroup(appTheme)}>
            <div className="title">掩码:</div>
            <div className="items">
              {result.mask.map((item, index) => (
                <>
                  {index !== 0 ? '  .  ' : ''}
                  <Input className="fix-width" value={item} readOnly />
                </>
              ))}
            </div>
          </div>
          {result.canUse > 0 ? (
            <div className={configGroup(appTheme)}>
              <div className="title">网络地址:</div>
              <div className="items">
                {result.netAddress.map((item, index) => (
                  <>
                    {index !== 0 ? '  .  ' : ''}
                    <Input className="fix-width" value={item} readOnly />
                  </>
                ))}
              </div>
            </div>
          ) : null}
          <div className={configGroup(appTheme)}>
            <div className="title">第一可用地址:</div>
            <div className="items">
              {result.firstAddress.map((item, index) => (
                <>
                  {index !== 0 ? '  .  ' : ''}
                  <Input className="fix-width" value={item} readOnly />
                </>
              ))}
            </div>
          </div>
          {result.onlyOne ? null : (
            <div className={configGroup(appTheme)}>
              <div className="title">最后可用地址:</div>
              <div className="items">
                {result.lastAddress.map((item, index) => (
                  <>
                    {index !== 0 ? '  .  ' : ''}
                    <Input className="fix-width" value={item} readOnly />
                  </>
                ))}
              </div>
            </div>
          )}
          {result.canUse > 0 ? (
            <div className={configGroup(appTheme)}>
              <div className="title">广播地址:</div>
              <div className="items">
                {result.broadcastAddress.map((item, index) => (
                  <>
                    {index !== 0 ? '  .  ' : ''}
                    <Input className="fix-width" value={item} readOnly />
                  </>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default IP
