import React from 'react'
import { radio } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = {
  key: string
  checked: boolean
  title: string
  onChange: (key: string) => void
  appTheme: AppTheme
}

const Radio: React.FC<Props> = ({ key, checked, title, onChange, appTheme }: Props) => {
  return (
    <div key={key} className={radio(appTheme)}>
      <label>
        <input type="radio" checked={checked} onChange={() => onChange(key)} />
        {title}
      </label>
    </div>
  )
}

export default Radio
