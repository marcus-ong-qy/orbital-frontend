import styled, { FontType } from 'styled-components'
import Button from '../../../../components/common/Button/Button'
import { fontTypeCss } from '../../../../styles/index.styled'

export const UserProfileDiv = styled.div`
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

export const EntryDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  grid-gap: 12px;

  width: 100%;
  height: 26px;
  margin-bottom: 11px;
`

export const EntryValue = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 600;
  white-space: nowrap;
`

export const EntryName = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 300;
  text-align: right;
  white-space: nowrap;
`

export const ProfileDiv = styled.div`
  width: 37vw;
  height: 100%;
`

export const EditButton = styled(Button)`
  height: 35px;
  width: 100%;
  border-radius: 35px;

  cursor: pointer;

  background: ${(props) => props.theme.palette.primary};
  font-weight: bold;
  font-size: 18px;

  span {
    color: ${(props) => props.theme.palette.text.white};
  }

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  }
`

export const PictureDiv = styled.div`
  width: 19vw;
  height: 100%;
  margin: 25px 1.5vw 0 0;
`

export const ItemPicture = styled.img`
  width: 19vw;
  height: 19vw;

  border-style: solid;
  border-width: 1.2px;
  border-radius: 12px;
`
