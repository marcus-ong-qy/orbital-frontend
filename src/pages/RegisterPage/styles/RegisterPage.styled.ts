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

export const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(408px, 35vw);
  height: 408px;
  margin-top: 15vh;
`;

// export const RegisterForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const StyledInput = styled(Input)`
//   height: 35px;
//   width: 84vw;
//   margin-bottom: 2vh;
// `;

// export const StyledButton = styled(Button)`
//   height: 35px;
//   width: 84vw;
//   background: ${(props) => props.theme.palette.secondary};
//   color: black;
//   font-weight: bold;
// `;
