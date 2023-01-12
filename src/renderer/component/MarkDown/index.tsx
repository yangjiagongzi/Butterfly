import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTheme } from '../UseTheme'
import { container, globalStyle } from './styles'

type Props = {
  markdown: string
}

const MarkDown: React.FC<Props> = ({ markdown }: Props) => {
  const appTheme = useTheme()
  globalStyle(appTheme)

  return (
    <div className={`${container(appTheme)} markdown-container`}>
      <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default MarkDown
