import styled from 'styled-components';
import { Input, Button } from 'antd';
import { FontType } from '../../../styles/Theme';
import { fontTypeCss } from '../../../styles/index.styled';

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
  height: 469px;
  margin-top: 15vh;
  padding-bottom: 65px;

  border-style: solid;
`;

export const ForgetPasswordTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 50px;
  margin-top: 25px;

  line-height: 1.1;
`;

export const HorseHead = styled.img`
  width: 194px;
  height: 194px;
`;

export const ResetEmailMsg = styled.div<{ fontType: FontType }>`
  height: 27px;
`;

export const ForgetPasswordForm = styled.form`
  width: 82%;
`;

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
