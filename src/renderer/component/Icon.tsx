import React from 'react'
import comparer from '~/assets/svg/comparer.svg'
import decoder from '~/assets/svg/decoder.svg'
import intruder from '~/assets/svg/intruder.svg'
import otherTools from '~/assets/svg/otherTools.svg'
import settings from '~/assets/svg/settings.svg'

const IconMap = {
  Comparer: comparer,
  Decoder: decoder,
  Intruder: intruder,
  OtherTools: otherTools,
  Settings: settings
} as const

const SVGSizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 44,
  xl: 72
} as const

export type IconName = keyof typeof IconMap
export type IconSize = keyof typeof SVGSizes

type Props = {
  name: IconName
  size: IconSize
  color?: string
}

const Icon: React.FC<Props> = ({ name, size, color = '#000' }: Props) => {
  const { id, viewBox } = IconMap[name]
  const svgSize = SVGSizes[size]
  return (
    <svg height={svgSize} width={svgSize} viewBox={`${viewBox}`} stroke={color}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}

export default Icon
