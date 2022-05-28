import styled from 'styled-components';
import GoogleButton from 'react-google-button';
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

export const LoginForm = styled.form`
  width: 100%;
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
    color: ${(props) => props.theme.palette.highlight};
  }
`;

export const OrSpan = styled.div`
  width: 56px;
  height: 39px;
  font-weight: 700;
  font-size: 24px;
  line-height: 22px;

  display: flex;
  align-items: top;
  justify-content: center;
  text-decoration-line: underline;
`;

export const NewUserSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  margin-top: 24px;
`;

export const GoogleButtonStyled = styled(GoogleButton)``;

export const SignUpLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight};
  }
`;
