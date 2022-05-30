import { css } from 'styled-components'
import { FontType } from './Theme'

// Global style variables
export const fontTypeCss = css<{ fontType: FontType }>`
  font-weight: ${({ fontType }) => fontType.weight};
  font-size: ${({ fontType }) => `clamp(${fontType.min}, ${fontType.size}, ${fontType.max})`};
  line-height: ${({ fontType }) => fontType.height};
`

export const styledPageCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// Login and Sign Up pages
export const loginDivStyleVar = {
  margin: '12vh',
  padding: '32px min(56px, 4vw)',
}

export const loginFormsCss = css`
  width: 100%;
`

export const orSpanCss = css`
  width: 56px;
  height: 39px;
  font-weight: 700;
  font-size: 24px;
  line-height: 22px;

  display: flex;
  align-items: top;
  justify-content: center;
  text-decoration-line: underline;
`
