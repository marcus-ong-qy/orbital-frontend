import styled, { css } from "styled-components";

export const greyBackground = css`
  height: 100%;
  min-height: 100vh;
  background-color: #dddddd;
`;

export const StyledMain = styled.main`
  overflow: scroll;
  padding: 4vh;
  ${greyBackground}
  ::-webkit-scrollbar {
    display: none;
  }
`;
