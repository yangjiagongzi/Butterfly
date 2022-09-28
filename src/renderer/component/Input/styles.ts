import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const input = (appTheme: AppTheme, error: boolean) => css`
  display: inline-block;
  line-height: ${appTheme.fontSizes.extraSmall};
  font-size: ${appTheme.fontSizes.extraSmall};
  padding: ${appTheme.spacing.xsmall}px;
  color: ${appTheme.colors.textDark};
  background: ${appTheme.colors.secondaryBackground};
  border-radius: 5px;
  border: none;
  ${error ? 'outline: 2px solid red' : ''};
  ${error ? 'animation: inputShake 0.3s ease-out 1;' : ''}

  @keyframes inputShake {
    0% {
      transform: translateX(0px);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
`
