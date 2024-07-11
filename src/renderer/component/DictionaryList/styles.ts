import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const resultContainer = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  ul {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0;
    padding: 0;
  }

  .button-container {
    position: absolute;
    top: ${appTheme.spacing.small}px;
    right: ${appTheme.spacing.small}px;

    button {
      margin: 0 ${appTheme.spacing.xxsmall}px;
    }
  }
`

export const resultItem = (appTheme: AppTheme) => css`
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  padding: ${appTheme.spacing.xsmall}px;
  margin: 2px;
  background: ${appTheme.colors.primaryBackground};
  list-style: none;
  color: ${appTheme.colors.textDark};
`
