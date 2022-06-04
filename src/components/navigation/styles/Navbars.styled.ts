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

  height: ${navBarBuffer};
  width: 100vw;

  background-color: ${(props) => props.theme.palette.primary};
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
`

export const SearchDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

export const SearchBar = styled(Input.Search)`
  width: 50vw;

  .ant-input-search,
  .ant-input-group {
    width: 100%;
    margin-top: 1.9vh;
    display: flex;
    flex-direction: row;
  }
  .ant-input-search-button {
    width: 28px;
    height: 28px;
  }
  .ant-input {
    width: calc(100% - 26px);
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

  .ant-input-search,
  .ant-input-group {
    width: 50vw;
    margin-top: 1.9vh;
    display: flex;
    flex-direction: row;
  }
  .ant-input-search-button {
    width: 28px;
    height: 28px;
  }
  .ant-input {
    width: calc(100% - 26px);
  }
`

export const RightDiv = styled.div`
  width: 25vw;
`
