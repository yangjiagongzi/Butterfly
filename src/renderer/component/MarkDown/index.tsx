import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTheme } from '../UseTheme'
import { container } from './styles'

type Props = {
  markdown: string
}

const MarkDown: React.FC<Props> = ({ markdown }: Props) => {
  const appTheme = useTheme()

  return (
    <div className={container(appTheme)}>
      <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default MarkDown
