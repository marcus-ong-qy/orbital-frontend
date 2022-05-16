import styled, { css } from "styled-components";

export const background = css`
  height: 100%;
  min-height: 100vh;
`;

export const StyledMain = styled.main`
  overflow: scroll;
  padding: 4vh;
  ${background}
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledNavPage = styled.main`
  overflow: scroll;
  padding: 4vh;
  ${background}
  ::-webkit-scrollbar {
    display: none;
  }
`;
