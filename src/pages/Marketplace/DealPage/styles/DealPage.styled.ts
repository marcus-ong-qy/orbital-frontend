// For ease of creating new pages, just copy enire folder and rename accordingly

import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'
import Button from '../../../../components/common/Button/Button'

import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledDealPage = styled.div`
  ${styledPageCss}
  display: flex;
  flex-direction: row;

  padding-top: 28px;
`

export const LeftDiv = styled.div`
  width: 600px;
`

export const ItemShowcaseDiv = styled.div`
  ${borderedGreyDivCss}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 347px;
`

export const ItemPicture = styled.img`
  width: 335px;
  height: 302px;

  object-fit: contain;
`

export const BottomDiv = styled.div`
  ${borderedGreyDivCss}

  width: 100%;
  height: 132px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const OwnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const OwnerName = styled.div``

export const InfoDiv = styled.div`
  width: 43vw;

  margin-left: 41px;
`

export const DealSummaryCard = styled.div`
  ${borderedGreyDivCss}
  width: 100%;
  height: 306px;
`

// export const ItemName = styled.div<{ fontType: FontType }>`
//   ${fontTypeCss}
// `

// export const PriceTag = styled.div<{ fontType: FontType }>`
//   ${fontTypeCss}
//   color: ${(props) => props.theme.palette.highlight.regular};
// `

// export const DescriptionDiv = styled.div``

export const InfoRowDiv = styled.div``

export const InfoRowTitle = styled.span`
  font-weight: 700;
`

export const InfoRowValue = styled.span``

export const Subheader = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const DealInfoDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ChatButton = styled(Button)`
  border-radius: 0;
`

export const DealButton = styled(Button)`
  background: ${(props) => props.theme.palette.primary};
  border-radius: 0;
`
