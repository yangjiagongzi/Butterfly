import React, { InputHTMLAttributes, useMemo, useState } from 'react'
import { input } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  appTheme: AppTheme
  error?: boolean
}

const Input: React.FC<Props> = ({ appTheme, error = false, ...otherProps }: Props) => {
  const [translateX, setTranslateX] = useState(0)
  useMemo(() => {
    if (!error) {
      setTranslateX(0)
    } else {
      setTimeout(() => {
        setTranslateX(5)
        setTimeout(() => {
          setTranslateX(-5)
          setTimeout(() => {
            setTranslateX(5)
            setTimeout(() => {
              setTranslateX(0)
            }, 80)
          }, 80)
        }, 80)
      }, 80)
    }
  }, [error])
  return <input {...otherProps} className={input(appTheme, error, translateX)} />
}

export default Input
