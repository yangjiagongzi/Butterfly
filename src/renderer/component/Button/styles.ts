import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const button = (appTheme: AppTheme) => css`
  color: ${appTheme.colors.textDark};
  border: 1px solid #333;
  background: ${appTheme.colors.secondaryBackground};
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background: ${appTheme.colors.primaryBackground};
  }

  &:active {
    background: ${appTheme.colors.secondaryBackground};
  }
`
