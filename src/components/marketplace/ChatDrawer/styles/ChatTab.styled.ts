import styled, { FontType } from 'styled-components'
import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'

export const ChatTabDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%; // 30vw
  height: 112px;
  padding: 17px 1.5vw;

  border-bottom: 1px solid ${(props) => props.theme.palette.common.black};

  cursor: pointer;

  :hover {
    ${borderedGreyDivCss}
    box-shadow: 1px 2px ${(props) => props.theme.palette.common.gray.light};
    transition: all 0.1s ease-out;
    transform: scale(1.01) translateY(-2px);
  }
`

export const ChatInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: clamp(90px, 15vw, 234px);
  height: 100%;
`

export const ChatUsername = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ChatPreview = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 264.6;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ItemInfo = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ProductPic = styled.img`
  width: clamp(30px, 6vw, 78px);
  height: clamp(30px, 6vw, 78px);

  object-fit: contain;
`
