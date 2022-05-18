import { Input, Button } from 'antd';
import styled from 'styled-components';

export const StyledForgetPasswordPage = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ForgetPasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(589px, 43vw);
  height: 408px;
  margin-top: 15vh;

  border-style: solid;
`;

export const HorseHead = styled.img`
  width: 64px;
  height: 64px;
`;

// export const ForgetPasswordForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

export const StyledInput = styled(Input)`
  height: 35px;
  width: 100%;
  margin-bottom: 2vh;
`;

export const StyledButton = styled(Button)`
  height: 35px;
  width: 100%;
  background: ${(props) => props.theme.palette.secondary};
  color: black;
  font-weight: bold;
`;
