import styled from 'styled-components'
import { Input } from 'antd'
import { FontType } from '../../../styles/Theme'
import { fontTypeCss } from '../../../styles/index.styled'

export const navBarBuffer = 'clamp(100px, 18vh, 138px)'

export const StyledLandingPageNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 999;

  height: ${navBarBuffer};
  width: 100vw;

  background: ${(props) => props.theme.palette.primary};
  box-shadow: 0 1px 5px ${(props) => props.theme.palette.common.gray.light};
`

export const StyledLogo = styled.img`
  height: 100%;
  width: auto;
`

export const NavbarTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  width: 14.5vw;
  margin-right: 2vw;
  text-align: center;

  color: ${(props) => props.theme.palette.common.white};

  cursor: pointer;
`

export const SearchDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

export const SearchBar = styled(Input.Search)`
  width: 50vw;

  .ant-input-group {
    position: relative;
    display: flex;

    width: 50vw;
    margin-top: 1.9vh;
  }
  .ant-input-group-addon {
    position: absolute;
    right: 26px;
  }
  .ant-input-search-button {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    border-width: 2px;
    background: ${(props) => props.theme.palette.common.gray.normal};

    cursor: pointer;

    :hover {
      background: ${(props) => props.theme.palette.highlight.normal};
    }
  }
  .ant-input {
    height: 35px;
    width: calc(100% - 26px);
    padding-left: 12px;
    border-radius: 28px;
  }
`

export const ShoppingCartDiv = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const ShoppingCart = styled.img`
  height: 33px;
  width: 44px;

  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`

export const BodyDiv = styled.div<{ width?: string }>`
  width: ${(props) => props.width ?? ''};
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const RightDiv = styled.div`
  width: 25vw;
`
