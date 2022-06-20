// For ease of creating new pages, just Search enire folder and rename accordingly

import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'

import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledUploadListingPage = styled.div`
  ${styledPageCss}
`

export const SearchesDiv = styled.div`
  ${borderedGreyDivCss}
  width: 89%;
  min-height: 67vh;
  margin-top: 53px;
`

export const SearchTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;

  height: 68px;
  margin-left: 41px;
`

export const SearchListingsDiv = styled.div`
  height: 100%;
  width: 100%;

  overflow: hidden;
`

export const NoListingsLabel = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  margin-left: 41px;
  color: ${(props) => props.theme.palette.danger};
`
