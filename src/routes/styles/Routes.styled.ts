import styled, { css } from "styled-components";

export const primaryBackground = css`
  height: 100%;
  min-height: 100vh;
  background-color: {(props) => props.theme.palette.background};
`;

export const StyledMain = styled.main`
  overflow: scroll;
  padding: 4vh;
  ${primaryBackground}
  ::-webkit-scrollbar {
    display: none;
  }
`;
