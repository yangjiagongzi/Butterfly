import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  box-sizing: border-box;
  padding: ${appTheme.spacing.medium}px;
  overflow-y: scroll;
  table-layout: fixed;
`

export const textContent = (appTheme: AppTheme, height = '100%') => css`
  flex: 1;
  margin: 0 ${appTheme.spacing.xxsmall}px;
  height: ${height};

  textarea {
    height: 100%;
  }
`

export const diffPreview = (appTheme: AppTheme, height = '100%') => css`
  flex: 0 1 auto;
  height: ${height};
  width: ${appTheme.spacing.medium * 2}px;
  position: relative;

  .del {
    position: absolute;
    left: 0;
    width: ${appTheme.spacing.medium}px;
    background: #c22f23;
    height: 100px;
    top: 50px;
  }

  .add {
    position: absolute;
    left: ${appTheme.spacing.medium}px;
    width: ${appTheme.spacing.medium}px;
    background: #41551f;
    height: 100px;
    top: 75px;
  }
`
