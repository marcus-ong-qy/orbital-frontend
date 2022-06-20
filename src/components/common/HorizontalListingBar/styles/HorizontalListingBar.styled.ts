import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'

import { borderedGreyDivCss, fontTypeCss } from '../../../../styles/index.styled'

export const ListingBarDiv = styled.div`
  ${borderedGreyDivCss}
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 112px;

  :hover {
    box-shadow: 1px 2px ${(props) => props.theme.palette.common.gray.light};
    transition: all 0.1s ease-out;
    transform: scale(1.01) translateY(-1px);
  }
`

export const ListingInfoDiv = styled.div`
  display: flex;
  flex-direction: column;

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

export const StatusLabel = styled.div<{ type: 'Sell' | 'Rent'; available: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 32px;
  border-radius: 51px;

  font-weight: 800;
  color: ${(props) => props.theme.palette.common.white};

  background: ${(props) => {
    if (!props.available) return props.theme.palette.danger
    return props.type === 'Sell' ? props.theme.palette.primary : props.theme.palette.secondary
  }};
`

export const PriceTag = styled.div`
  margin-left: 9px;
`

export const ItemPic = styled.img`
  width: 98px;
  height: 100%;

  object-fit: contain;
`
