import styled, { FontType } from 'styled-components'
import { fontTypeCss } from '../../../../styles/index.styled'

export const UserListingTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;

  height: 68px;
  padding-left: 41px;
  line-height: 68px;

  border-bottom: 1px solid ${(props) => props.theme.palette.common.black};
`

export const UserListingsDiv = styled.div`
  height: calc(100% - 68px);
  width: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
`

export const NoListingsLabel = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  display: flex;
  justify-content: center;
  width: 100%;

  margin-top: 41px;
  color: ${(props) => props.theme.palette.danger};
`
