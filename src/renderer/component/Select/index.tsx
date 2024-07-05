import React, { useEffect, useRef, useState } from 'react'
import Triangle from '../Triangle'
import { useTheme } from '../UseTheme'
import { selectBox, icon, selectList } from './styles'

type Item = { id: string; name: string }
type Props = {
  title?: string
  data: Item[]
  value: Item
  className?: string
  onChange: (select: Item) => void
}

const Select: React.FC<Props> = ({ title, data, value, className = '', onChange }: Props) => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState(value)
  const [active, setActive] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const [boxSize, setBoxSize] = useState(0)

  useEffect(() => {
    setBoxSize(boxRef.current?.offsetHeight || 0)
  }, [])

  useEffect(() => {
    setChoose(value)
  }, [value])

  return (
    <div
      className={`${selectBox(appTheme, active)} ${className}`}
      onClick={() => setActive(!active)}
      onBlur={() => setActive(false)}
      ref={boxRef}
      tabIndex={0}
    >
      <div>
        {choose.name}
        {title ? <div className="layout-placehold">{title}</div> : null}
        {data.map(({ id, name }) => (
          <div key={id} className="layout-placehold">
            {name}
          </div>
        ))}
      </div>
      <Triangle
        size={appTheme.spacing.xxsmall}
        color={active ? appTheme.colors.active : appTheme.colors.textLight}
        className={icon(appTheme, active)}
      />
      {title ? <div className="title">{title}</div> : null}
      {active ? (
        <div className={selectList(appTheme, boxSize)}>
          {data.map(item => (
            <div
              key={item.id}
              className={`selectItem ${choose.id === item.id ? 'active' : ''}`}
              onClick={() => {
                setChoose(item)
                onChange(item)
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Select
