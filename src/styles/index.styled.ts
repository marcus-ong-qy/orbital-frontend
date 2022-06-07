import { css, keyframes } from 'styled-components'
import { FontType } from './Theme'

// Global style variables
export const fontTypeCss = css<{ fontType: FontType }>`
  font-weight: ${({ fontType }) => fontType.weight};
  font-size: ${({ fontType }) => `clamp(${fontType.min}, ${fontType.size}, ${fontType.max})`};
  line-height: ${({ fontType }) => fontType.height};
`

// TODO consider globalising it
export const styledPageCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 5vw;
`

export const borderedGreyDivCss = css`
  border: 1px solid ${(props) => props.theme.palette.common.black};
  background: ${(props) => props.theme.palette.common.gray.normal};
`

export const gallopAnimation = keyframes`
  0% {
    transform: rotate(0) translateX(0) translateY(0);
  }
  25% {
    transform: rotate(-10deg) translateX(-20px) translateY(10px) ;
  }
  50% {
    transform: rotate(0) translateX(0) translateY(0);
  }
  75% {
    transform: rotate(25deg) translateX(20px) translateY(-10px);
  }
  100% {
    transform: rotate(0) translateX(0) translateY(0);
  }
`

// Login and Sign Up pages

export const authDivStyleCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(408px, 35vw);
  height: auto;
  margin-top: 12vh;
`

export const authFormsCss = css`
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
