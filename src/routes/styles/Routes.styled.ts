import styled, { css } from "styled-components";

export const lemonBackground = css`
  height: 100%;
  min-height: 100vh;
  background-color: #dddddd;
`;

export const StyledMain = styled.main`
  overflow: scroll;
  ${lemonBackground}
  ::-webkit-scrollbar {
    display: none;
  }
`;
