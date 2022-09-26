import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  padding: ${appTheme.spacing.medium}px;
`

export const hexGroup = (appTheme: AppTheme) => css`
  display: flex;
  align-items: center;
  padding: ${appTheme.spacing.xsmall}px 0;

  .title {
    width: 50px;
    flex: 0 0 auto;
  }

  .items {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
`
