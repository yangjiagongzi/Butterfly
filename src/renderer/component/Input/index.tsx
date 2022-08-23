import React, { InputHTMLAttributes } from 'react'
import { input } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  appTheme: AppTheme
}

const Input: React.FC<Props> = ({ appTheme, ...otherProps }: Props) => {
  return <input {...otherProps} className={input(appTheme)} />
}

export default Input
