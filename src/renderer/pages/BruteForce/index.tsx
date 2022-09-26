import React, { useMemo, useState } from 'react'
import { Dics } from '~/constant/dictionary'
import List from '~/renderer/component/List'
import Radio from '~/renderer/component/Radio'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { container, paramGroup, resultListContainer } from './styles'

type Props = {
  appTheme: AppTheme
}

const BruteForce: React.FC<Props> = ({ appTheme }: Props) => {
  const [choose, setChoose] = useState('')
  const [resultList, setResultList] = useState<string[]>([])

  useMemo(() => {
    const result = Dics.find(item => item.name === choose)?.result || []
    setResultList(result)
  }, [choose])
  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">字典选择:</div>
        <div className="items">
          {Dics.map((item, index) => (
            <Radio
              key={item.name}
              hexKey={`${index}`}
              title={item.name}
              checked={item.name === choose}
              appTheme={appTheme}
              onChange={() => {
                setChoose(item.name)
              }}
            />
          ))}
        </div>
      </div>
      {resultList.length ? (
        <div className={resultListContainer(appTheme)}>
          <List appTheme={appTheme} data={resultList} />
        </div>
      ) : null}
    </div>
  )
}

export default BruteForce
