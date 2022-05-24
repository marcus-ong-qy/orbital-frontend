import styled from 'styled-components';
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
  height: min(469px, 61vh);
  margin-top: 15vh;
  padding: 0 min(84px, 6vw);

  background: ${(props) => props.theme.palette.common.gray};
  border: 1px solid ${(props) => props.theme.palette.common.black};
`;

export const SignUpDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  margin-top: 25px;
`;

export const SignUpWarningDiv = styled.div`
  margin-top: 20px;
  height: 25px;
`;
