import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
`

export const tabList = (appTheme: AppTheme) => css`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${appTheme.colors.divider};
`

export const tabItem = (appTheme: AppTheme, active: boolean) => css`
  padding: ${appTheme.spacing.medium}px ${appTheme.spacing.xlarge}px;
  border-right: 1px solid ${appTheme.colors.divider};
  color: ${active ? appTheme.colors.textDark : appTheme.colors.textLight};
  background: ${active ? appTheme.colors.background : appTheme.colors.primaryBackground};
`

export const content = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  padding: ${appTheme.spacing.medium}px;
`

export const contentItem = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  flex: 1;

  .payload {
    height: 100%;
  }

  .title {
    padding: ${appTheme.spacing.medium}px 0;
    color: ${appTheme.colors.textDark};
  }
`

export const curlStringBox = (appTheme: AppTheme, hasValue: boolean) => css`
  position: relative;

  .button-container {
    position: absolute;
    top: ${appTheme.spacing.small}px;
    right: ${appTheme.spacing.small}px;
    visibility: ${hasValue ? 'visible' : 'hidden'};
    button {
      margin: 0 ${appTheme.spacing.xxsmall}px;
    }
  }
`
