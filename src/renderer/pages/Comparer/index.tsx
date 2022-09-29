import * as Diff from 'diff'
import React, { useMemo, useRef, useState } from 'react'
import Textarea from '~/renderer/component/Textarea'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, textContent, diffPreview } from './styles'

const borderWidth = 1

const Comparer: React.FC = () => {
  const appTheme = useTheme()
  const [hegiht, setHeight] = useState<string | undefined>()
  const input1Ref = useRef<HTMLTextAreaElement>(null)
  const input2Ref = useRef<HTMLTextAreaElement>(null)
  const [string1, setString1] = useState('')
  const [string2, setString2] = useState('')

  const diffResult = useMemo(() => {
    const maxHeight = Math.max(
      input1Ref.current?.scrollHeight || 0,
      input2Ref.current?.scrollHeight || 0,
      window.screen.height - appTheme.spacing.medium * 2 - borderWidth * 2
    )
    setHeight(`${maxHeight + borderWidth * 2}px`)
    return Diff.diffLines(string1, string2)
  }, [string1, string2])

  console.log(diffResult)

  return (
    <div className={container(appTheme)}>
      <div className={textContent(appTheme, hegiht)}>
        <Textarea ref={input1Ref} value={string1} onChange={e => setString1(e.target.value)} />
      </div>
      <div className={textContent(appTheme, hegiht)}>
        <Textarea ref={input2Ref} value={string2} onChange={e => setString2(e.target.value)} />
      </div>
      <div className={diffPreview(appTheme, hegiht)}>
        <div className="del"></div>
        <div className="add"></div>
      </div>
    </div>
  )
}

export default Comparer
