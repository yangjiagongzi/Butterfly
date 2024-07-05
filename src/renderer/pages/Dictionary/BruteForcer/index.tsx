import React, { useEffect, useState } from 'react'
import { CapitalLetter, LowercaseLetter, NumberCode } from '~/constant/dictionary'
import List from '~/renderer/component/List'
import Radio from '~/renderer/component/Radio'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, paramGroup, resultListContainer } from './styles'

const BruteForcer: React.FC = () => {
  const appTheme = useTheme()
  const [resultList, setResultList] = useState<string[]>([])
  const [characterOption, setCharacterOption] = useState<{
    number: boolean
    letter: boolean
    caseSensitive: boolean
  }>({ number: false, letter: false, caseSensitive: false })

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
    setResultList([...new Set(str.split(''))])
  }, [characterOption])

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
      {resultList.length ? (
        <div className={resultListContainer(appTheme)}>
          <List data={resultList} />
        </div>
      ) : null}
    </div>
  )
}

export default BruteForcer
