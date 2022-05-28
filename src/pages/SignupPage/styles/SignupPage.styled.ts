import styled from 'styled-components'
import { FontType } from '../../../styles/Theme'
import Button from '../../../components/Button/Button'

import {
  fontTypeCss,
  styledPageCss,
  loginDivStyleVar,
  orSpanCss,
  loginFormsCss,
} from '../../../styles/index.styled'

export const StyledSignupPage = styled.div`
  ${styledPageCss}
`

export const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: min(673px, 49vw);
  height: auto;
  margin: ${loginDivStyleVar.margin} 0;
  padding: ${loginDivStyleVar.padding};

  background: ${(props) => props.theme.palette.common.gray};
  border: 1px solid ${(props) => props.theme.palette.common.black};
`

export const SignupDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const SignupForm = styled.form`
  ${loginFormsCss}
`

export const SignupWarningDiv = styled.div`
  margin-top: 10px;
  height: 25px;
`

export const SignupButton = styled(Button)`
  margin-top: 1vh;
`

export const OrSpan = styled.div`
  ${orSpanCss}
  margin-top: 16px;
`

export const ExistingUserSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  margin-top: 5vh;
  font-weight: 700;
`

export const LoginLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.normal};
  }
`
