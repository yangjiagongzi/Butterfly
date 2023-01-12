import { css, injectGlobal } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const container = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: ${appTheme.spacing.medium}px;
`
export const globalStyle = ({ colors }: AppTheme) => injectGlobal`
  .markdown-container {
    font-family: 'PingFang SC', 'Hiragino Sans GB', Helvetica, Arial, sans-serif;
    padding: 1em;
    margin: auto;
    color: ${colors.textDark};
    background-color: ${colors.primaryBackground};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote {
      margin: 0;
      padding: 0;
    }

    table {
      margin: 10px 0 15px 0;
      border-collapse: collapse;
    }

    td,
    th {
      border: 1px solid ${colors.textMedium};
      padding: 3px 10px;
    }

    th {
      padding: 5px 10px;
    }

    a {
      color: ${colors.primary};
    }

    a:hover {
      color: ${colors.primaryOpacity};
      text-decoration: none;
    }

    a img {
      border: none;
    }

    p {
      margin: 4.5px 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 36px;
      padding: 5px 0;
    }

    h1 {
      margin-bottom: 18px;
      font-size: 30px;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 18px;
    }

    h4 {
      font-size: 16px;
    }

    h5 {
      font-size: 14px;
    }

    h6 {
      font-size: 13px;
    }

    hr {
      margin: 10px 0 20px;
      border: 0;
      border-bottom: 2px solid ${colors.divider};
    }

    blockquote {
      color: ${colors.textMedium};
      background-color: ${colors.card};
      margin: 0;
      padding: 10px 10px 10px 2em;
      border-left: 0.5em ${colors.textMedium} solid;
      font-family: 'STKaiti', georgia, serif;
    }

    code,
    pre {
      font-family: Monaco, Andale Mono, Courier New, monospace;
      font-size: 12px;
    }

    code {
      color: ${colors.greenLight};
      font-weight: 700;
      background-color: ${colors.textUltraLight};
      padding: 1px 3px;
      margin: 0 5px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }

    pre {
      display: block;
      border: 1px solid ${colors.divider};
      border-radius: 3px;
      overflow: auto;
      padding: 14px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    pre code {
      background-color: inherit;
      border: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 10px 0;
    }

    blockquote li,
    code li,
    pre li {
      padding: 0;
    }

    sup {
      font-size: 0.83em;
      vertical-align: super;
      line-height: 0;
    }
  }
`
