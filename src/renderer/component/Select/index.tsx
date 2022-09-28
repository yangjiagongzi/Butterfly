import React, { SelectHTMLAttributes, useEffect, useState } from 'react'
import { select } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  appTheme: AppTheme
  data: string[]
  value: string
  onChange: (value: string) => void
}

const Select: React.FC<Props> = ({ appTheme, data, value, onChange, ...otherProps }: Props) => {
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
