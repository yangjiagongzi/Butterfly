import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  padding: ${appTheme.spacing.medium}px;
  color: ${appTheme.colors.textDark};
`

export const hexGroup = (appTheme: AppTheme) => css`
  display: flex;
  align-items: center;
  padding: ${appTheme.spacing.xsmall}px 0;

  .title {
    width: 50px;
    flex: 0 0 auto;
    color: ${appTheme.colors.textDark};
  }

  .items {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .fix-width {
    width: ${appTheme.spacing.gutter}px;
  }
`
