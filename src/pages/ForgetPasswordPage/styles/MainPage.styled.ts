import { Input, Button } from "antd";
import styled from "styled-components";
import { grey } from "../../styles/Colours";

export const StyledForgetPasswordPage = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ForgetPasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledInput = styled(Input)`
  height: 35px;
  width: 84vw;
  margin-bottom: 2vh;
`;

export const StyledButton = styled(Button)`
  height: 35px;
  width: 84vw;
  background: ${grey};
  color: black;
  font-weight: bold;
`;
