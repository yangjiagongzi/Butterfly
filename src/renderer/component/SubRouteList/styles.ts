import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const toolList = (appTheme: AppTheme) => css`
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  border-right: 1px solid ${appTheme.colors.divider};
  overflow-x: hidden;
  overflow-y: auto;
`

export const toolItem = (appTheme: AppTheme) => css`
  padding: ${appTheme.spacing.small}px;
  text-align: center;
  color: ${appTheme.colors.textDark};
  cursor: pointer;

  &:hover {
    background: ${appTheme.colors.background};
  }

  &.active {
    color: ${appTheme.colors.active};
    background: ${appTheme.colors.background};
  }
`
