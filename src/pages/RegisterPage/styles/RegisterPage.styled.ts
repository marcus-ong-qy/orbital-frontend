import styled from 'styled-components';
import GoogleButton from 'react-google-button';
import { FontType } from '../../../styles/Theme';
import { fontTypeCss } from '../../../styles/index.styled';

export const StyledSignUpPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: min(673px, 49vw);
  height: 469px;
  margin: 15vh 0;
  padding: 0 min(56px, 4vw);

  background: ${(props) => props.theme.palette.common.gray};
  border: 1px solid ${(props) => props.theme.palette.common.black};
`;

export const SignUpDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  margin-top: 25px;
`;

export const SignUpForm = styled.form`
  width: 100%;
`;

export const SignUpWarningDiv = styled.div`
  margin-top: 10px;
  height: 25px;
`;

export const ExistingUserSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  margin-top: 5vh;
  font-weight: 700;
`;

export const OrSpan = styled.div`
  width: 56px;
  height: 39px;
  font-weight: 700;
  font-size: 24px;
  line-height: 22px;
  margin-top: 16px;

  display: flex;
  align-items: top;
  justify-content: center;
  text-decoration-line: underline;
`;

export const GoogleButtonStyled = styled(GoogleButton)``;

export const LoginLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight};
  }
`;
