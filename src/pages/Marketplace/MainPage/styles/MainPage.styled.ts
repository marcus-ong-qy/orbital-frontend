import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'
import {
  fontTypeCss,
  gallopAnimation,
  borderedGreyDivCss,
  styledPageCss,
} from '../../../../styles/index.styled'

export const StyledMainPage = styled.div`
  ${styledPageCss}
`

export const GreetingsDiv = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 22px;
`
export const GreetingsSpan = styled.span`
  margin-left: 10px;
`

export const GreetingsUsernameSpan = styled.span`
  color: ${(props) => props.theme.palette.primary};
`

export const HorseHead = styled.img`
  height: 79px;
  width: 79px;
  animation-name: ${gallopAnimation};
  animation-duration: 0.5s;
  animation-iteration-count: 2;

  :hover {
    animation-iteration-count: infinite;
  }
`

export const CarouselDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 347px;
  width: 100%;
  margin-bottom: 45px;

  ${borderedGreyDivCss}
`

export const Title = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 22px;
`

export const FeaturedDiv = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 45px;

  ${borderedGreyDivCss}
`

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  height: 100%;
`

export const FeaturedItemsContainer = styled(ItemsContainer)`
  /* height: 658px; */
  width: auto;
  /* overflow-x: scroll;
  overflow-y: hidden; */
`

export const CategoriesDiv = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; */

  height: 274px;
  width: 100%;
  margin-bottom: 45px;

  ${borderedGreyDivCss}
`

export const ListingsDiv = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; */

  height: auto;
  width: 100%;
  margin-bottom: 45px;

  ${borderedGreyDivCss}
`
