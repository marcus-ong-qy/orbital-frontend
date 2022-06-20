import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'

import { fontTypeCss } from '../../../../styles/index.styled'

export const UserListingTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;

  height: 68px;
  margin-left: 41px;
`

export const UserListingsDiv = styled.div`
  height: 100%;
  width: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
`

export const NoListingsLabel = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  margin-left: 41px;
  color: ${(props) => props.theme.palette.danger};
`
