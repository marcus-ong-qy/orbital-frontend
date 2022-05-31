import styled from 'styled-components'
import { FontType } from '../../../styles/Theme'
import { fontTypeCss } from '../../../styles/index.styled'

export const StyledNavLink = styled.span`
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.light};
  }
`

export const NavLinks = styled.span<{ fontType: FontType; justify?: string }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify ?? 'left'};
  padding-left: ${(props) => (props.justify !== 'center' ? '13px' : '')};

  color: ${(props) => props.theme.palette.common.white};
  cursor: default;
`

export const LinkGroupSpan = styled.span<{ width?: string; margin?: string }>`
  display: flex;
  justify-content: center;
  overflow: left;

  width: ${(props) => props.width ?? 'auto'};
  margin: ${(props) => props.margin ?? '0'};
`
