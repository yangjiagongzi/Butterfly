import React, { HTMLAttributes } from 'react'
import { resultContainer, resultItem } from './styles'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import Button from '../Button'
import { clipboard } from 'electron'
import { showMessageBox } from '../../IPC'

type Props = HTMLAttributes<HTMLUListElement> & {
  appTheme: AppTheme
  data: string[]
}

const List: React.FC<Props> = ({ appTheme, data, ...otherProps }: Props) => {
  const copy = () => {
    const str = data.join('\n')
    clipboard.writeText(str)
    showMessageBox('复制成功!')
  }

  const start = () => {
    console.log('开始爆破')
  }

  return (
    <div className={resultContainer(appTheme)}>
      <ul {...otherProps}>
        {data.map(key => (
          <li className={resultItem(appTheme)} key={key}>
            {key}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <Button appTheme={appTheme} onClick={copy} title="复制" />
        <Button appTheme={appTheme} onClick={start} title="开始爆破" />
      </div>
    </div>
  )
}

export default List
