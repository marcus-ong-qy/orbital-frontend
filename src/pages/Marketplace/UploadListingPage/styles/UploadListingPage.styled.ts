import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'
import Button from '../../../../components/common/Button/Button'

import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledUploadListingPage = styled.div`
  ${styledPageCss}
  flex-direction: column;
`

export const UploadListingDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export const TitleDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  width: 100%;
  margin: 25px 0;
`

export const TitleHighlight = styled.span<{ type: 'Rent' | 'Sell' }>`
  color: ${(props) =>
    props.type === 'Rent' ? props.theme.palette.secondary : props.theme.palette.primary};
`

export const LeftDiv = styled.div`
  ${borderedGreyDivCss}

  width: 24vw;
  height: 485px;
`

export const ItemPicture = styled.img`
  width: 20vw;
  height: 20vw;

  margin: 19px 2vw 11px;
`

export const PictureButton = styled(Button)`
  // TODO doesn't work

  /* button {
    height: 35px;
    width: 100%;
    border-radius: 35px;

    margin: 0 2vw;

    cursor: pointer;

    background: ${(props) => props.theme.palette.primary};
    font-weight: bold;
    font-size: 18px;
  }

  span {
    color: ${(props) => props.theme.palette.common.white};
  }

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  } */
`

export const RightDiv = styled.div`
  ${borderedGreyDivCss}

  width: 66vw;
  height: 485px;
  margin-left: 2.5vw;
`

export const PostForm = styled.form`
  margin: 22px 6vw 32px;
`

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

export const PostButton = styled(Button)`
  // TODO doesn't work

  /* height: 35px;
  width: 100%;
  border-radius: 35px;

  cursor: pointer;

  background: ${(props) => props.theme.palette.primary};
  font-weight: bold;
  font-size: 18px;

  span {
    color: ${(props) => props.theme.palette.common.white};
  }

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  } */
`
