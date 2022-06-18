import styled, { css, keyframes } from 'styled-components'
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

export const ProfilePic = styled.img<{ diameter: string; round?: boolean }>`
  width: ${(props) => props.diameter};
  height: ${(props) => props.diameter};
  border-radius: ${(props) => props.round && '50%'};
`

// Authentication pages

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

// Forms

export const EntryDiv = styled.div<{ type: 'input' | 'textarea' }>`
  display: grid;
  grid-template-columns: 2.5fr 7.5fr;
  grid-gap: 12px;

  width: 100%;
  height: ${(props) => (props.type === 'input' ? '26px' : '106px')};
  margin-bottom: 11px;

  div {
    margin: 0;
  }

  input {
    height: ${(props) => (props.type === 'input' ? '26px' : '106px')};
  }
`

export const EntryArea = styled.textarea`
  height: 106px;
  border-radius: 16px;
  padding: 8px 0 0 12px;
`

export const EntryName = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  /* display: flex; */

  text-align: right;
  line-height: 26px;
`
