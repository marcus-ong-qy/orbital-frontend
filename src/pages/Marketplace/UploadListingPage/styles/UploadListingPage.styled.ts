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
  padding: 2vw;
`

export const ItemPicture = styled.img`
  width: 20vw;
  height: 20vw;
  margin: 19px 0 11px;
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
