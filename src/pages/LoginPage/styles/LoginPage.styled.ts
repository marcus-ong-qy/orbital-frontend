import styled, { css } from 'styled-components';
import { Button, Input } from 'antd';

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

// export const NeighLogo = styled.img`
//   width: 64vh;
//   height: 64vh;
// `;

// export const LoginForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

export const StyledInput = styled(Input)`
  height: 35px;
  width: 100%;
  margin-bottom: 3vh;
`;

export const StyledPasswordInput = styled(Input.Password)`
  height: 35px;
  width: 100%;
  margin-bottom: 4vh;
  .ant-input {
    height: 35px;
    /* width: 72vw; */
  }
  .anticon {
    margin-left: 3vw;
  }
`;

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  background: ${(props) => props.theme.palette.secondary};
  color: black;
  font-weight: bold;
`;

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
