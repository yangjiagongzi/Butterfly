import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, paramGroup } from './styles'

const BruteForce: React.FC = (props: any) => {
  const appTheme = useTheme()
  const location = useLocation()
  const [dictionary, setDictionary] = useState('')

  useEffect(() => {
    const dictionary = location.state as string
    setDictionary(dictionary)
  }, [])

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">载荷:</div>
        <div className="items">
          <textarea value={dictionary} />
        </div>
      </div>
    </div>
  )
}

export default BruteForce
