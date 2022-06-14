import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'

import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

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
  height: 23px;
  font-weight: 700;
`

export const MenuHyperlink = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 23px;

  color: ${(props) => props.theme.palette.common.black};

  :hover {
    color: ${(props) => props.theme.palette.highlight.dark};
  }

  cursor: pointer;
`

export const ContentDiv = styled.div`
  ${borderedGreyDivCss}

  width: 66vw;
  height: 485px;
  margin-left: 2.5vw;
`
