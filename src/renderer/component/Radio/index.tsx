import React from 'react'
import { radio } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = {
  hexKey: string
  checked: boolean
  title: string
  onChange: (key: string) => void
  appTheme: AppTheme
}

const Radio: React.FC<Props> = ({ hexKey, checked, title, onChange, appTheme }: Props) => {
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
