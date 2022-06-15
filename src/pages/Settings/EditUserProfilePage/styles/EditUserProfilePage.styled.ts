import styled from 'styled-components'
import Button from '../../../../components/common/Button/Button'
import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'
import { FontType } from '../../../../styles/Theme'

export const UploadListingDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export const TitleDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  width: 100%;
  margin: 25px 0;
`

export const ProfileForm = styled.form`
  width: 37vw;
  height: 100%;
`

export const EntryDiv = styled.div<{ type: 'input' | 'textarea' }>`
  display: grid;
  grid-template-columns: 2.5fr 7.5fr;
  grid-gap: 12px;

  width: 100%;
  height: ${(props) => (props.type === 'input' ? '26px' : '106px')};
  margin-bottom: 11px;
`

export const EntryArea = styled.textarea`
  height: 106px;
  border-radius: 16px;
  padding: 8px 0 0 12px;
`

export const EntryName = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  text-align: right;
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
  width: 262px;
  height: 262px;
`

export const PictureButton = styled(Button)`
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
