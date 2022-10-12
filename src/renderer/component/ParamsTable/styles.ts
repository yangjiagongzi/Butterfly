import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const tableContainer = ({ fontSizes, colors, spacing }: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  overflow: hidden;

  table {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-collapse: separate;
    border-spacing: 0px;
    border: none;
    display: flex;
    flex-direction: column;

    tbody {
      display: block;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      flex: 1;

      tr:hover {
        background: ${colors.secondaryBackground};
      }
    }

    tr {
      box-sizing: border-box;
      table-layout: fixed;
      display: table;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid rgb(81, 81, 81);
    }

    th {
      box-sizing: border-box;
      font-weight: 500;
      text-align: left;
      font-size: ${fontSizes.small}px;
      line-height: ${fontSizes.medium * 2}px;
      padding: 0 ${spacing.medium}px;
    }

    td {
      box-sizing: border-box;
      text-align: left;
      padding: 0 ${spacing.medium}px;
    }

    th:first-child,
    td:first-child {
      width: 30%;
    }

    th:last-child,
    td:last-child {
      width: 100px;
      box-sizing: content-box;
      padding-right: ${spacing.medium * 3}px;
      text-align: center;
      position: relative;
    }

    .del {
      position: absolute;
      top: ${fontSizes.small - spacing.large / 2}px;
      right: ${spacing.small}px;
      height: ${spacing.large}px;
      width: ${spacing.large}px;
      border-radius: ${spacing.large / 2}px;
      visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .del:hover {
      background: ${colors.textUltraLight};
    }

    tr:hover .del {
      visibility: visible;
    }

    input {
      padding: 0;
      margin: 0;
      background: none;
      outline: none;
      border: none;
      color: ${colors.textDark};
      font-size: ${fontSizes.extraSmall}px;
      line-height: ${fontSizes.small * 2}px;
      width: 100%;
      flex: 1;
    }
  }
`
