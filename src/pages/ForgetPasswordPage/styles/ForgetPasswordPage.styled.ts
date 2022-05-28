import styled from 'styled-components';
import { FontType } from '../../../styles/Theme';
import {
  fontTypeCss,
  loginPagesCss,
  loginDivStyleVar,
} from '../../../styles/index.styled';
import Button from '../../../components/Button/Button';

export const StyledForgetPasswordPage = styled.div`
  ${loginPagesCss}
`;

export const ForgetPasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(589px, 43vw);
  height: auto;
  margin: ${loginDivStyleVar.margin};
  padding: ${loginDivStyleVar.padding};

  background: ${(props) => props.theme.palette.common.gray};
  border: 1px solid ${(props) => props.theme.palette.common.black};
`;

export const ForgetPasswordTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 50px;

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
  width: 100%;
`;

export const ResetPasswordButton = styled(Button)`
  margin-top: 1vh;
`;
