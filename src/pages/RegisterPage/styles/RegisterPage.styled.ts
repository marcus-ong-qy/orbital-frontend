import { Input, Button } from 'antd';
import styled from 'styled-components';

export const StyledRegisterPage = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RegisterDivTitle = styled.h1``;

export const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 88.5vw;
  height: 61vh;
  margin-top: 15vh;

  background: ${(props) => props.theme.palette.common.gray};
  border: 1px solid ${(props) => props.theme.palette.common.black};
`;

export const RegisterSubDiv = styled.div``;

export const FullNameSpan = styled.div`
  width: 100%;
  display: grid;
  grid-template: 'a a';
  grid-gap: 1.5vw;
`;

// export const RegisterForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
