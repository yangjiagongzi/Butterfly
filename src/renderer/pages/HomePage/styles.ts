import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const box = (appTheme: AppTheme, size: number) => css`
  height: ${size}px;
  width: ${size}px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`

export const label = (
  appTheme: AppTheme,
  {
    index,
    activeIndex,
    length,
    typeIndex,
    totalWidth
  }: {
    index: number
    activeIndex: number
    length: number
    typeIndex: number
    totalWidth: number
  }
) => {
  const active = index === activeIndex % length
  const deg = (360 / length) * (activeIndex - index)
  const width = totalWidth / 18
  const x = totalWidth / 2 + ((typeIndex + 1) * totalWidth) / 18
  const y = totalWidth / 2 + appTheme.fontSizes.medium / 2
  return css`
    color: ${active ? appTheme.colors.active : appTheme.colors.textMedium};
    font-size: ${appTheme.fontSizes.extraExtraSmall}px;
    line-height: ${appTheme.fontSizes.medium}px;
    text-align: center;
    width: ${width}px;
    border: none;
    border-bottom: ${active ? `1px solid ${appTheme.colors.active}` : 'none'};
    background: none;
    transition: transform 1s;
    transform-origin: ${totalWidth / 2 - x}px 50%;
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    transform: rotate(${deg}deg);
  `
}
