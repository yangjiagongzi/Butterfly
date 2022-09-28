import React, { useEffect, useState } from 'react'
import { Dics } from '~/constant/dictionary'
import List from '~/renderer/component/List'
import Radio from '~/renderer/component/Radio'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, paramGroup, resultListContainer } from './styles'

const DictionaryGenerate: React.FC = () => {
  const characterName = '字符'
  const appTheme = useTheme()
  const [choose, setChoose] = useState(characterName)
  const [resultList, setResultList] = useState<string[]>([])
  const [characterOption, setCharacterOption] = useState<{
    number: boolean
    letter: boolean
    caseSensitive: boolean
  }>({ number: false, letter: false, caseSensitive: false })

  useEffect(() => {
    if (choose !== characterName) {
      const result = Dics.find(item => item.name === choose)?.result || []
      setResultList([...new Set(result)])
    } else {
      let str = ''
      if (characterOption.number) {
        str = str + '0123456789'
      }
      if (characterOption.letter) {
        str = str + 'abcdefghijklmnopqrstuvwxyz'
        if (characterOption.caseSensitive) {
          str = str + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }
      }
      setResultList([...new Set(str.split(''))])
    }
  }, [choose, characterOption])

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">字典选择:</div>
        <div className="items">
          <Select
            data={[characterName, ...Dics.map(item => item.name)]}
            value={characterName}
            onChange={(value: string) => setChoose(value)}
          />
        </div>
      </div>
      {choose === characterName ? (
        <div className={paramGroup(appTheme)}>
          <div className="title">字符规则:</div>
          <div className="items">
            <Radio
              hexKey={'数字'}
              title={'数字'}
              checked={characterOption.number}
              onChange={() => {
                setCharacterOption({ ...characterOption, number: !characterOption.number })
              }}
            />
            <Radio
              hexKey={'字母'}
              title={'字母'}
              checked={characterOption.letter}
              onChange={() => {
                setCharacterOption({ ...characterOption, letter: !characterOption.letter })
              }}
            />
            <Radio
              hexKey={'大小写敏感'}
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
      ) : null}
      {resultList.length ? (
        <div className={resultListContainer(appTheme)}>
          <List data={resultList} />
        </div>
      ) : null}
    </div>
  )
}

export default DictionaryGenerate
