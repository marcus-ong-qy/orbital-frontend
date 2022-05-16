import styled from 'styled-components';
import { fontTypeCss } from '../../../styles/index.styled';
import { FontType } from '../../../styles/Theme';

export const navBarBuffer = 'clamp(100px, 18vh, 138px)';

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
`;

export const StyledLogo = styled.img`
  height: 100%;
  width: auto;
`;

export const NavbarTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  width: 14.5vw;
  margin-right: 2vw;
  text-align: center;
`;

export const SearchDiv = styled.div`
  width: 50vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .ant-input-search,
  .ant-input-group {
    width: 100%;
    margin-top: 1.9vh;
    display: flex;
    flex-direction: row;
  }
  .ant-input-search-button {
    width: 26px;
    height: 26px;
  }
  .ant-input {
    width: calc(100% - 26px);
  }
`;

export const RightDiv = styled.div`
  width: 25vw;
`;
