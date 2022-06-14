import styled from 'styled-components'
import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'
import { FontType } from '../../../../styles/Theme'

export const StyledSettingsPage = styled.div`
  ${styledPageCss}
  flex-direction: row;

  margin-top: 53px;
`

export const SettingsMenuDiv = styled.div`
  ${borderedGreyDivCss}

  width: 24vw;
  height: 485px;
`

export const MenuSubDiv = styled.div``

export const MenuSubtitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
`

export const MenuHyperlink = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const ContentDiv = styled.div`
  ${borderedGreyDivCss}

  width: 66vw;
  height: 485px;
  margin-left: 2.5vw;
`
