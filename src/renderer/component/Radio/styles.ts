import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const radio = (appTheme: AppTheme) => css`
  display: inline-block;
  line-height: ${appTheme.fontSizes.extraSmall};
  font-size: ${appTheme.fontSizes.extraSmall};
  vertical-align: top;
  padding: ${appTheme.spacing.xsmall}px;

  input {
    margin-right: ${appTheme.spacing.xxsmall}px;
  }
`
