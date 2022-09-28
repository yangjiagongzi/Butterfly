import React, { InputHTMLAttributes } from 'react'
import { input } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  appTheme: AppTheme
  error?: boolean
}

const Input: React.FC<Props> = ({ appTheme, error = false, ...otherProps }: Props) => {
  return <input {...otherProps} className={input(appTheme, error)} />
}

export default Input
