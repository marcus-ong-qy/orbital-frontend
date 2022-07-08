import styled, { FontType } from 'styled-components'

import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'

export const ListingBarDiv = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 112px;
  padding: 0 4vw;

  border-bottom: 1px solid ${(props) => props.theme.palette.common.black};

  cursor: pointer;

  :hover {
    ${borderedGreyDivCss}
    box-shadow: 1px 2px ${(props) => props.theme.palette.common.gray.light};
    transition: all 0.1s ease-out;
    transform: scale(1.01) translateY(-1px);
  }
`

export const ListingInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 18px 0;

  width: 100%;
  height: 112px;
`

export const ListingTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ListingStatusDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StatusLabel = styled.div<{
  type: 'Sell' | 'Rent'
  available: boolean
  offerAlert: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 24px;
  border-radius: 51px;

  font-weight: 700;
  color: ${(props) => props.theme.palette.text.white};

  background: ${(props) => {
    if (!props.available) return props.theme.palette.danger
    return props.type === 'Sell' ? props.theme.palette.primary : props.theme.palette.secondary
  }};

  filter: ${(props) =>
    props.offerAlert ? `drop-shadow(0px 1px 4px ${props.theme.palette.highlight.dark})` : ''};
`

export const PriceTag = styled.div`
  margin-left: 9px;
`

export const PriceStyled = styled.span`
  color: ${(props) => props.theme.palette.highlight.regular};
`

export const ItemPic = styled.img`
  width: 98px;
  height: 100%;

  object-fit: contain;
`
