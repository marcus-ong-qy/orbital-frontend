// For ease of creating new pages, just copy enire folder and rename accordingly

import styled from 'styled-components'
import { FontType } from '../../../styles/Theme'
import Button from '../../../components/Button/Button'
import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../styles/index.styled'

export const StyledItemPage = styled.div`
  ${styledPageCss}
  display: flex;
  flex-direction: row;

  margin-top: 28px;
`

export const ItemShowcaseDiv = styled.div`
  ${borderedGreyDivCss}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 600px;
  height: 347px;
`

export const ItemPicture = styled.img`
  width: 335px;
  height: 302px;

  object-fit: contain;
`

export const InfoDiv = styled.div`
  width: 43vw;

  margin-left: 41px;
`

export const ItemName = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const PriceTag = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  color: ${(props) => props.theme.palette.highlight.regular};
`

export const DescriptionDiv = styled.div``

export const Subheader = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const DealInfoDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ItemConditionSpan = styled.span``

export const TagsDiv = styled.div``

export const TagsSpan = styled.span`
  display: flex;
  flex-direction: row;
`

export const Tag = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  height: 26px;
  margin-right: 8px;
  padding: 0 10px;

  background: ${(props) => props.theme.palette.primary};
  border: 1px solid ${(props) => props.theme.palette.common.black};
  border-radius: 20px;
  color: ${(props) => props.theme.palette.common.white};
`

export const OwnerSpan = styled.span``

export const DealButton = styled(Button)`
  border-radius: 0;
`
