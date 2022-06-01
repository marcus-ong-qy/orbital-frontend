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

export const UsernameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const UsernameSpan = styled.span`
  display: flex;
`

export const DisplayPic = styled.img`
  height: 21px;
  width: 21px;
`

export const DropdownDiv = styled.div`
  position: absolute;
  top: 36px;

  width: 112px;
  height: 76px;

  background: ${(props) => props.theme.palette.common.gray.normal};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
