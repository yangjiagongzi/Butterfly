import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  box-sizing: border-box;
  padding: ${appTheme.spacing.xlarge}px;
`

export const optionContainer = (appTheme: AppTheme) => css`
  width: 380px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  box-sizing: border-box;
`

export const paramGroup = (appTheme: AppTheme) => css`
  display: flex;
  align-items: center;
  padding: ${appTheme.spacing.xsmall}px 0;

  .title {
    width: 125px;
    flex: 0 0 auto;
    color: ${appTheme.colors.textDark};
  }

  .items {
    flex: 1;
    display: flex;
    flex-wrap: wrap;

    input:disabled {
      color: ${appTheme.colors.textUltraLight};
    }
  }
`
export const resultListContainer = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  padding: ${appTheme.spacing.medium}px;
  border-radius: 10px;
  background: ${appTheme.colors.secondaryBackground};
`
