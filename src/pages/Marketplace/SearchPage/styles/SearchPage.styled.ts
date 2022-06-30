import styled, { FontType } from 'styled-components'
import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledSearchPage = styled.div`
  ${styledPageCss}
`

export const SearchDiv = styled.div`
  ${borderedGreyDivCss}
  width: 89%;
  min-height: 67vh;
  margin: 53px 0;
`

export const SearchTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;

  height: 68px;
  padding-left: 41px;
  border-bottom: 1px solid ${(props) => props.theme.palette.common.black};
`

export const SearchTagsDiv = styled.div`
  ${borderedGreyDivCss}
  width: 100%;
  min-height: 54px;
`

export const SearchListingsDiv = styled.div`
  width: 100%;
  height: 51vh;

  overflow-y: scroll;
  overflow-x: hidden;
`

export const NoListingsLabel = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  margin: 41px;
  color: ${(props) => props.theme.palette.danger};
`
