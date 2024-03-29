import styled, { FontType } from 'styled-components'
import { getClamp } from '../../../../styles/Theme'
import { fontTypeCss } from '../../../../styles/index.styled'

export const StyledNavLink = styled.span`
  color: ${(props) => props.theme.palette.text.white};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.light};
  }
`

export const StyledUsernameHover = styled(StyledNavLink)<{ maxWidth: string }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  height: 21px;
  max-width: ${(props) => props.maxWidth};
  margin-left: 2px;
`

export const NavLinks = styled.span<{ fontType: FontType; justify?: string }>`
  ${fontTypeCss}
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify ?? 'left'};
  padding-left: ${(props) => (props.justify !== 'center' ? '13px' : '')};

  color: ${(props) => props.theme.palette.text.white};
  cursor: default;
`

export const LinkGroupSpan = styled.span<{ width?: string; margin?: string }>`
  display: flex;
  justify-content: center;
  overflow: left;

  width: ${(props) => props.width ?? 'auto'};
  margin: ${(props) => props.margin ?? 0};

  color: ${(props) => props.theme.palette.text.white};
  cursor: default;
`

export const UsernameDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const UsernameSpan = styled.span`
  display: flex;

  :hover {
    text-decoration: underline;
  }
`

export const DropdownDiv = styled.div`
  position: absolute;
  top: ${(props) => getClamp(props.theme.typography.fontSize.navLinkFont)};

  width: max(8vw, 112px);
  height: 76px;

  display: grid;

  background: ${(props) => props.theme.palette.common.gray.light};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const DropdownButtons = styled.div<{ fontType: FontType; justify?: string }>`
  ${fontTypeCss}
  font-weight: 700;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.dark};
  }
`
