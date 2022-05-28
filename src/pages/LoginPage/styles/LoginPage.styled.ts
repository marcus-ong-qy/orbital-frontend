import styled from 'styled-components';
import {
  fontTypeCss,
  loginPagesCss,
  loginDivStyleVar,
  orSpanCss,
  loginFormsCss,
} from '../../../styles/index.styled';
import { FontType } from '../../../styles/Theme';

export const StyledLoginPage = styled.div`
  ${loginPagesCss}
`;

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max(408px, 35vw);
  height: auto;
  margin-top: ${loginDivStyleVar.margin};
`;

export const LoginDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  margin-bottom: 2vh;
`;

export const LoginForm = styled.form`
  ${loginFormsCss}
`;

export const ForgetPwdSpan = styled.span`
  width: 100%;
  margin-top: 0.5vh;
`;

export const ForgetPwdLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  float: right;
  margin-right: 1vw;

  font-weight: 700;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.normal};
  }
`;

export const OrSpan = styled.div`
  ${orSpanCss}
`;

export const NewUserSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  margin-top: 24px;
`;

export const SignUpLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.normal};
  }
`;
