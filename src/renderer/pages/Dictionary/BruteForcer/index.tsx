import React, { useEffect, useState } from 'react'
import { CapitalLetter, LowercaseLetter, NumberCode } from '~/constant/dictionary'
import DictionaryList from '~/renderer/component/DictionaryList'
import Input from '~/renderer/component/Input'
import Radio from '~/renderer/component/Radio'
import { useTheme } from '~/renderer/component/UseTheme'
import { BaseGenerator, payloadGenerateForCharacter } from '~/utils/PayloadGenerate'
import { container, paramGroup, resultListContainer } from './styles'

const BruteForcer: React.FC = () => {
  const appTheme = useTheme()
  const [generator, setGenerator] = useState<BaseGenerator | null>(null)
  const [characterOption, setCharacterOption] = useState<{
    number: boolean
    letter: boolean
    caseSensitive: boolean
  }>({ number: false, letter: false, caseSensitive: false })
  const [length, setLength] = useState(4)

  useEffect(() => {
    let str = ''
    if (characterOption.number) {
      str = str + NumberCode
    }
    if (characterOption.letter) {
      str = str + LowercaseLetter
      if (characterOption.caseSensitive) {
        str = str + CapitalLetter
      }
    }
    const generator = payloadGenerateForCharacter({ character: str, length })
    setGenerator(generator)
  }, [characterOption, length])

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">字符规则:</div>
        <div className="items">
          <Radio
            title={'数字'}
            checked={characterOption.number}
            onChange={() => {
              setCharacterOption({ ...characterOption, number: !characterOption.number })
            }}
          />
          <Radio
            title={'字母'}
            checked={characterOption.letter}
            onChange={() => {
              setCharacterOption({ ...characterOption, letter: !characterOption.letter })
            }}
          />
          <Radio
            title={'大小写敏感'}
            checked={characterOption.caseSensitive}
            onChange={() => {
              setCharacterOption({
                ...characterOption,
                caseSensitive: !characterOption.caseSensitive
              })
            }}
          />
        </div>
      </div>
      <div className={paramGroup(appTheme)}>
        <div className="title">长度:</div>
        <div className="items">
          <Input
            value={length}
            onChange={e => {
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0 && num <= 20) {
                setLength(num)
              }
            }}
          />
        </div>
      </div>
      {generator ? (
        <div className={resultListContainer(appTheme)}>
          <DictionaryList generator={generator} />
        </div>
      ) : null}
    </div>
  )
}

export default BruteForcer
