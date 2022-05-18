import styled, { css } from 'styled-components';
import { Button, Input } from 'antd';
import { fontTypeCss } from '../../../styles/index.styled';
import { FontType } from '../../../styles/Theme';

export const StyledLoginPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(408px, 35vw);
  height: 408px;
  margin-top: 15vh;
`;

export const LoginDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  margin-bottom: 2vh;
`;

// export const NeighLogo = styled.img`
//   width: 64vh;
//   height: 64vh;
// `;

// export const LoginForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const LinksDiv = styled.div`
//   width: 95%;
//   margin-top: 15.5vh;
//   display: flex;
//   flex-direction: row;
// `;

// const StyledLink = css`
//   color: black;
//   font-weight: bold;
//   font-size: 18px;
//   cursor: pointer;
//   :active {
//     color: ${(props) => props.theme.palette.common.black};
//   }
// `;

// export const RegisterLink = styled.a`
//   ${StyledLink}
//   margin-top: auto;
// `;

// export const ForgetPwdLink = styled.a`
//   ${StyledLink}
//   width: 21vw;
//   margin-left: auto;
//   text-align: right;
// `;
