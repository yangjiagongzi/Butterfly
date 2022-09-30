import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${appTheme.spacing.medium}px;
  position: relative;
`

export const startBtn = ({ colors, fontSizes, spacing }: AppTheme) => css`
  position: absolute;
  top: ${spacing.medium * 2 - spacing.small}px;
  right: ${spacing.medium}px;
  z-index: 10;
`

export const content = ({ colors, fontSizes, spacing }: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  padding-top: ${spacing.medium}px;
`

export const inputBox = ({ colors, fontSizes, spacing }: AppTheme) => css`
  display: flex;
`
