import React, { ButtonHTMLAttributes } from 'react'
import { button } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  appTheme: AppTheme
  title: string
}

const Input: React.FC<Props> = ({ appTheme, title, ...otherProps }: Props) => {
  return (
    <button className={button(appTheme)} {...otherProps}>
      {title}
    </button>
  )
}

export default Input
