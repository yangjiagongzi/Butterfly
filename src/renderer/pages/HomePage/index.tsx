import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useTheme } from '~/renderer/component/UseTheme'
import { useInterval } from '~/renderer/hooks/useInterval'
import { box, container, label } from './styles'

const HomePage: React.FC = () => {
  const appTheme = useTheme()
  const { width: boxWidth, height: boxHeight, ref: boxRef } = useResizeDetector()
  const calcWidth = useMemo(() => {
    return Math.min(boxWidth || 0, boxHeight || 0)
  }, [boxWidth, boxHeight])
  const weekText = useMemo(() => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], [])
  const monthText = useMemo(
    () => [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    []
  )
  const dayText = useMemo(
    () => new Array(31).fill('').map((item, idx) => `${(idx + 1).toString().padStart(2, '0')}日`),
    []
  )
  const hourText = useMemo(
    () => new Array(24).fill('').map((item, idx) => `${idx.toString().padStart(2, '0')}时`),
    []
  )
  const minuteText = useMemo(
    () => new Array(60).fill('').map((item, idx) => `${idx.toString().padStart(2, '0')}分`),
    []
  )
  const secondText = useMemo(
    () => new Array(60).fill('').map((item, idx) => `${idx.toString().padStart(2, '0')}秒`),
    []
  )
  const allText = useMemo(
    () => [monthText, dayText, weekText, hourText, minuteText, secondText],
    []
  )
  const [activeIndex, setActiveIndex] = useState<number[]>([])
  const calcActiveIndex = useCallback(
    ({ now, next, max }: { now?: number; next: number; max: number }) => {
      if (now === undefined) {
        return next + max
      }
      const remainder = now % max
      return now + ((next - remainder + max) % max)
    },
    []
  )
  const run = useCallback(() => {
    const now = new Date()
    setActiveIndex([
      calcActiveIndex({ now: activeIndex[0], next: now.getMonth(), max: allText[0].length }),
      calcActiveIndex({ now: activeIndex[1], next: now.getDate() - 1, max: allText[1].length }),
      calcActiveIndex({ now: activeIndex[2], next: now.getDay(), max: allText[2].length }),
      calcActiveIndex({ now: activeIndex[3], next: now.getHours(), max: allText[3].length }),
      calcActiveIndex({ now: activeIndex[4], next: now.getMinutes(), max: allText[4].length }),
      calcActiveIndex({ now: activeIndex[5], next: now.getSeconds(), max: allText[5].length })
    ])
  }, [activeIndex])

  useEffect(() => {
    run()
  }, [])

  useInterval(() => {
    run()
  }, 100)

  return (
    <div ref={boxRef} className={container(appTheme)}>
      <div className={box(appTheme, calcWidth)}>
        {allText.map((list, typeIndex) =>
          list.map((text, textIndex) => (
            <div
              key={`${typeIndex}-${textIndex}`}
              className={label(appTheme, {
                index: textIndex,
                activeIndex:
                  activeIndex[typeIndex] !== undefined ? activeIndex[typeIndex] : textIndex,
                length: list.length,
                typeIndex: typeIndex,
                totalWidth: calcWidth
              })}
            >
              {text}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage
