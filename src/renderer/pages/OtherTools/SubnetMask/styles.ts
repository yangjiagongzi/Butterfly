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

export const configGroup = (appTheme: AppTheme) => css`
  display: flex;
  align-items: center;
  padding: ${appTheme.spacing.xsmall}px 0;

  .title {
    width: 100px;
    flex: 0 0 auto;
    color: ${appTheme.colors.textDark};
  }

  .items {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    button {
      margin-left: ${appTheme.spacing.xsmall}px;
    }
  }

  .fix-width {
    width: ${appTheme.spacing.xsWidth + appTheme.spacing.xxsWidth}px;
    margin: 0 ${appTheme.spacing.xsmall}px;
  }
`
