import React, { InputHTMLAttributes } from 'react'
import { useTheme } from '../UseTheme'
import { input } from './styles'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

const Input: React.FC<Props> = ({ error = false, ...otherProps }: Props) => {
  const appTheme = useTheme()
  return <input {...otherProps} className={input(appTheme, error)} />
}

export default Input
