import { css } from 'emotion'
import { Theme as AppTheme } from '~/renderer/styles/theme'

export const router = (appTheme: AppTheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`

export const navBar = ({ colors }: AppTheme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${colors.secondaryBackground};
`

export const content = ({ colors }: AppTheme) => css`
  width: 100%;
  height: 100%;
  flex: 1;
  background: ${colors.primaryBackground};
`

export const navBarItem = ({ colors, fontSizes }: AppTheme) => css`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .note {
    display: none;
    position: absolute;
    left: 50px;
    white-space: nowrap;
    font-size: ${fontSizes.extraExtraSmall};
    padding: 4px;
    border: 1px solid #fff;
  }

  &:hover .note {
    display: block;
  }

  .activeBar {
    height: 100%;
    width: 2px;
    background: ${colors.textDark};
    position: absolute;
    left: 0;
    top: 0;
  }
`
