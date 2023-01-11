import React from 'react'
import MarkDown from '~/renderer/component/MarkDown'

const Note: React.FC = () => {
  return (
    <MarkDown
      markdown={`A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `}
    />
  )
}

export default Note
