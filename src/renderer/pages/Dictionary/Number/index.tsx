import React, { useEffect, useState } from 'react'
import List from '~/renderer/component/List'
import Radio from '~/renderer/component/Radio'
import { useTheme } from '~/renderer/component/UseTheme'
import { NumberGenerateOption, payloadGenerateForNumber } from '~/utils/PayloadGenerate'
import { container, paramGroup, optionContainer, resultListContainer } from './styles'
import Input from '~/renderer/component/Input'

const NumberGenerate: React.FC = () => {
  const appTheme = useTheme()
  const [resultList, setResultList] = useState<string[]>([])
  const [characterOption, setCharacterOption] = useState<NumberGenerateOption>({
    isRandom: false,
    from: '0',
    to: '100',
    step: '1',
    howMany: 10,
    isHex: false,
    minIntegerDigits: 1,
    maxIntegerDigits: 10,
    minFractionDigits: 0,
    maxFractionDigits: 2
  })

  useEffect(() => {
    setResultList(payloadGenerateForNumber(characterOption))
  }, [characterOption])

  return (
    <div className={container(appTheme)}>
      <div className={optionContainer(appTheme)}>
        <div className={paramGroup(appTheme)}>
          <div className="title">类型:</div>
          <div className="items">
            <Radio
              title={'顺序生成'}
              checked={!characterOption.isRandom}
              onChange={() => {
                setCharacterOption({ ...characterOption, isRandom: false })
              }}
            />
            <Radio
              title={'随机生成'}
              checked={characterOption.isRandom}
              onChange={() => {
                setCharacterOption({ ...characterOption, isRandom: true })
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">From:</div>
          <div className="items">
            <Input
              value={characterOption.from}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, from: e.target.value })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">To:</div>
          <div className="items">
            <Input
              value={characterOption.to}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, to: e.target.value })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">Step:</div>
          <div className="items">
            <Input
              disabled={characterOption.isRandom}
              value={characterOption.step}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, step: e.target.value })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">数量:</div>
          <div className="items">
            <Input
              disabled={!characterOption.isRandom}
              value={characterOption.howMany}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, howMany: num })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">进制:</div>
          <div className="items">
            <Radio
              title={'十进制'}
              checked={!characterOption.isHex}
              onChange={() => {
                setCharacterOption({ ...characterOption, isHex: false })
              }}
            />
            <Radio
              title={'十六进制'}
              checked={characterOption.isHex}
              onChange={() => {
                setCharacterOption({ ...characterOption, isHex: true })
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">最小整数位数:</div>
          <div className="items">
            <Input
              value={characterOption.minIntegerDigits}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, minIntegerDigits: num })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">最大整数位数:</div>
          <div className="items">
            <Input
              value={characterOption.maxIntegerDigits}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, maxIntegerDigits: Math.min(num, 10) })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">最小小数位数:</div>
          <div className="items">
            <Input
              disabled={characterOption.isHex}
              value={characterOption.minFractionDigits}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, minFractionDigits: num })
                }
              }}
            />
          </div>
        </div>
        <div className={paramGroup(appTheme)}>
          <div className="title">最大小数位数:</div>
          <div className="items">
            <Input
              disabled={characterOption.isHex}
              value={characterOption.maxFractionDigits}
              onChange={e => {
                const num = Number(e.target.value)
                if (!Number.isNaN(num) && num >= 0) {
                  setCharacterOption({ ...characterOption, maxFractionDigits: Math.min(num, 10) })
                }
              }}
            />
          </div>
        </div>
      </div>
      {resultList.length ? (
        <div className={resultListContainer(appTheme)}>
          <List data={resultList} />
        </div>
      ) : null}
    </div>
  )
}

export default NumberGenerate
