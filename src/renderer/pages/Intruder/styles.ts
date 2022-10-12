import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${appTheme.spacing.medium}px;
  position: relative;
  color: ${appTheme.colors.textDark};
  user-select: none;
`

export const startBtn = ({ colors, fontSizes, spacing }: AppTheme) => css`
  position: absolute;
  top: ${spacing.medium * 2 - spacing.small}px;
  right: ${spacing.medium}px;
  z-index: 10;
`

export const content = ({ colors, fontSizes, spacing }: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${spacing.medium}px;
  overflow: hidden;
`

export const inputBox = ({ colors, fontSizes, spacing }: AppTheme) => css`
  display: flex;

  .method-select {
    border-radius: 5px 0 0 5px;
  }

  .url-input {
    flex: 1;
    border-radius: 0 5px 5px 0;
  }

  .curl-parse-btn {
    margin-left: ${spacing.small}px;
  }
`

export const introduce = ({ colors, fontSizes, spacing }: AppTheme) => css`
  border-top: 1px solid ${colors.divider};
  margin-top: ${spacing.xlarge}px;
  padding-top: ${spacing.medium}px;
  font-size: ${fontSizes.small}px;

  span {
    color: ${colors.activeOpacity};
    font-weight: 700;
    padding: 0 ${spacing.xxsmall}px;

    &.normal {
      color: ${colors.textDark};
      font-weight: normal;
      padding: 0;
    }
  }

  .text {
    font-size: ${fontSizes.medium}px;
    margin-bottom: ${spacing.medium}px;
  }

  .example-payload,
  .example-flag {
    font-size: ${fontSizes.small}px;
    line-height: ${fontSizes.small * 2}px;
  }

  table {
    margin-top: ${spacing.small}px;
    width: ${spacing.xxlWidth}px;
    border-collapse: separate;
    border-spacing: 0px;
    border-bottom: 1px solid rgb(81, 81, 81);

    tr {
      color: inherit;
      display: table-row;
      vertical-align: middle;
      outline: 0px;
    }

    th {
      font-weight: 500;
      border-bottom: 1px solid rgb(81, 81, 81);
      text-align: left;
      line-height: ${fontSizes.small * 2}px;
      padding: 0 ${spacing.medium}px;
      background: ${colors.secondaryBackground};
    }

    td {
      text-align: left;
      line-height: ${fontSizes.small * 2}px;
      padding: 0 ${spacing.medium}px;
    }
  }
`

export const requestContent = ({ colors, fontSizes, spacing }: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  padding-top: ${spacing.medium}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .requestOptions {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    overflow: hidden;
  }
`
