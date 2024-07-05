import React, { HTMLAttributes } from 'react'
import Button from '../Button'
import Notification from '../Notification'
import { useTheme } from '../UseTheme'
import { resultContainer, resultItem } from './styles'

type Props = HTMLAttributes<HTMLUListElement> & {
  data: string[]
}

const List: React.FC<Props> = ({ data, ...otherProps }: Props) => {
  const appTheme = useTheme()

  const copy = async () => {
    const str = data.join('\n')
    await window.Graphql.ClipboardWriteText({ text: str })
    Notification.show({ message: '复制成功!' })
  }

  const start = () => {
    console.log(data.join('\n'))
  }

  return (
    <div className={resultContainer(appTheme)}>
      <ul {...otherProps}>
        {data.map((key, idx) => (
          <li className={resultItem(appTheme)} key={`${idx}${key}`}>
            {key}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <Button onClick={copy} title="复制" />
        <Button onClick={start} title="开始爆破" />
      </div>
    </div>
  )
}

export default List
