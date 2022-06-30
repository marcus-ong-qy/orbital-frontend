import styled, { FontType } from 'styled-components'
import Button from '../../../../components/common/Button/Button'
import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'

export const EditUserProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 40px;
`

export const TitleDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  width: 100%;
  margin: 25px 0 25px 3vw;
`

export const ProfileForm = styled.form`
  width: 37vw;
  height: 100%;
`

export const PostButton = styled(Button)`
  height: 35px;
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
  }
`

export const PictureDiv = styled.div`
  width: 19vw;
  height: 100%;
`

export const ItemPicture = styled.img`
  width: 19vw;
  height: 19vw;

  border-style: solid;
  border-width: 1.2px;
  border-radius: 12px;
`
