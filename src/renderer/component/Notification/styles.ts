import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const notification = (appTheme: AppTheme) => css`
  position: absolute;
  top: -${appTheme.spacing.gutter}px;
  right: ${appTheme.spacing.xlarge}px;
  padding: ${appTheme.spacing.small}px ${appTheme.spacing.medium}px;
  background: ${appTheme.colors.primary};
  border-radius: 5px;
`
