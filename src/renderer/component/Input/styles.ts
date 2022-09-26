import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const input = (appTheme: AppTheme, error?: boolean) => css`
  display: inline-block;
  line-height: ${appTheme.fontSizes.extraSmall};
  font-size: ${appTheme.fontSizes.extraSmall};
  padding: ${appTheme.spacing.xsmall}px;
  color: ${appTheme.colors.textDark};
  background: ${appTheme.colors.secondaryBackground};
  border-radius: 5px;
  border: none;
  ${error ? 'outline: 2px solid red' : ''}
`
