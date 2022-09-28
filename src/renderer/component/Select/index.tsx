import React, { SelectHTMLAttributes, useEffect, useState } from 'react'
import { useTheme } from '../UseTheme'
import { select } from './styles'

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  data: string[]
  value: string
  onChange: (value: string) => void
}

const Select: React.FC<Props> = ({ data, value, onChange, ...otherProps }: Props) => {
  const appTheme = useTheme()
  const [choose, setChoose] = useState(value)

  useEffect(() => {
    setChoose(value)
  }, [value])

  return (
    <select
      className={select(appTheme)}
      value={choose}
      onChange={e => {
        setChoose(e.target.value)
        onChange(e.target.value)
      }}
      {...otherProps}
    >
      {data.map((item, index) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}

export default Select
