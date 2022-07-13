import styled, { FontType } from 'styled-components'
import { ItemStatus, TransactionType } from '../../../../store/marketplace/types'
import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledItemPage = styled.div`
  ${styledPageCss}
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding-top: 28px;
  padding-bottom: 28px;
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

const UserDiv = styled.div`
  ${borderedGreyDivCss}

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 132px;
`

export const ItemOwnerUserDiv = styled(UserDiv)`
  margin-top: 21px;
`

export const OfferAlertUserDiv = styled(UserDiv)`
  margin: 7px 0 21px;

  border: 3px solid ${(props) => props.theme.palette.highlight.regular};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

export const OfferAlertBuffer = styled.div`
  height: 160px;
`

export const BottomDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  position: absolute;
  top: 16px;
  left: 2vw;
`

export const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 16px 2vw 0 3vw;
`

export const UserInfoSubDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const UserInfoNameLink = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  padding-left: 1rem;

  cursor: pointer;
`

export const InfoDiv = styled.div`
  width: 43vw;

  margin-left: 41px;
`

export const ItemName = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const PriceDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  margin: 16px 0;

  font-weight: 500;
`

export const StatusTagStyled = styled.span<{ type: TransactionType; status: ItemStatus }>`
  font-weight: 800;
  color: ${(props) =>
    props.status === 'AVAILABLE'
      ? props.type === 'SELL'
        ? props.theme.palette.primary
        : props.theme.palette.secondary
      : props.theme.palette.highlight.regular};
`

export const PriceTag = styled.span`
  font-weight: 800;
  color: ${(props) => props.theme.palette.highlight.regular};
`

export const PerDayHighlight = styled.span`
  color: ${(props) => props.theme.palette.primary};
`

export const DescriptionDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const Subheader = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const DealInfoDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  margin-top: 8px;
`

export const ItemConditionSpan = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const TagsDiv = styled.div`
  margin-top: 8px;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
`

export const TagDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  height: 26px;
  margin: 4px;
  padding: 0 10px;

  background: ${(props) => props.theme.palette.primary};
  border: 1px solid ${(props) => props.theme.palette.common.black};
  border-radius: 20px;
  color: ${(props) => props.theme.palette.text.white};

  cursor: pointer;
`
