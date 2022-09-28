import React from 'react'
import { useTheme } from '../UseTheme'
import { radio } from './styles'

type Props = {
  hexKey: string
  checked: boolean
  title: string
  onChange: (key: string) => void
}

const Radio: React.FC<Props> = ({ hexKey, checked, title, onChange }: Props) => {
  const appTheme = useTheme()

  return (
    <div className={radio(appTheme)}>
      <label>
        <input
          type="radio"
          checked={checked}
          onClick={() => {
            onChange(hexKey)
          }}
          onChange={() => {
            // pass
          }}
        />
        {title}
      </label>
    </div>
  )
}

export default Radio
