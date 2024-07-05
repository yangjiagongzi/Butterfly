import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useTheme } from '../UseTheme'
import { tabList, tabItem, activeBar } from './styles'

type Item = { id: string; name: string }
type Props = {
  data: Item[]
  size?: 'small' | 'large'
  onChange: (value: Item) => void
}

const Tab: React.FC<Props> = ({ data, size = 'small', onChange }: Props) => {
  const appTheme = useTheme()
  const [active, setActive] = useState(0)
  const [activeBarWidth, setActiveBarWidth] = useState(0)
  const [activeTranslateX, setActiveTranslateX] = useState(0)
  const listBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listBoxRef.current
    const firstItem = list?.children[0]
    const firstItemWidth = firstItem?.scrollWidth || 0
    setActive(0)
    setActiveBarWidth(firstItemWidth)
    setActiveTranslateX(0)
  }, [])

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Item, idx: number) => {
      setActive(idx)
      onChange(item)
      const target = e.currentTarget
      setActiveBarWidth(target.offsetWidth)
      setActiveTranslateX(target.offsetLeft)
    },
    []
  )
  return (
    <div className={tabList(appTheme)} ref={listBoxRef}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className={tabItem(appTheme, size === 'small', active === idx)}
          onClick={e => onClick(e, item, idx)}
        >
          <div className="text">{item.name}</div>
          <div className="click-style" />
        </div>
      ))}
      <div className={activeBar(appTheme, activeBarWidth, activeTranslateX)} />
    </div>
  )
}

export default Tab
