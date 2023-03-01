import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
  padding: ${appTheme.spacing.medium}px;
`

export const paramGroup = (appTheme: AppTheme) => css`
  display: flex;
  align-items: center;
  padding: ${appTheme.spacing.xsmall}px 0;

  .title {
    width: 75px;
    flex: 0 0 auto;
    color: ${appTheme.colors.textDark};
  }

  .items {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
`
export const resultListContainer = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  margin: ${appTheme.spacing.medium}px 0;
  padding: ${appTheme.spacing.medium}px;
  border-radius: 10px;
  background: ${appTheme.colors.secondaryBackground};
`
