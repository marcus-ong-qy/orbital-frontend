import styled, { FontType } from 'styled-components'

import { borderedGreyDivCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledSettingsPage = styled.div`
  ${styledPageCss}
  flex-direction: row;
  height: 515px;

  margin: 53px 0;
`

export const SettingsMenuDiv = styled.div`
  ${borderedGreyDivCss}

  width: 24vw;
  height: 100%;
  padding: 18px 4vw 0 2.5vw;
`

export const MenuSubDiv = styled.div``

export const MenuSubtitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 23px;
  margin: 1.2rem 0 0.3rem;
  font-weight: 700;
  white-space: nowrap;
`

export const MenuHyperlink = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 23px;
  margin-left: 1.5vw;

  font-weight: 300;
  white-space: nowrap;

  color: ${(props) => props.theme.palette.text.black};

  :hover {
    color: ${(props) => props.theme.palette.highlight.dark};
  }

  cursor: pointer;
`

export const ContentDiv = styled.div`
  ${borderedGreyDivCss}

  width: 66vw;
  height: 100%;
  margin-left: 2.5vw;
`
