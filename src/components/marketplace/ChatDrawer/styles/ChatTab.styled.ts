import { Input } from 'antd'
import styled from 'styled-components'
import { fontTypeCss } from '../../../../styles/index.styled'
import { FontType } from '../../../../styles/Theme'

export const ChatTabDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 112px;
  padding: 17px 21px;
`

export const ProfilePic = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 50%;
`

export const ChatInfoDiv = styled.div`
  width: 100%;
  height: 100%;
`

export const ChatUsername = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ChatPreview = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ItemInfo = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ProductPic = styled.img`
  width: 78px;
  height: 78px;

  object-fit: contain;
`
