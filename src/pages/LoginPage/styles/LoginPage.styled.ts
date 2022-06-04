import styled from 'styled-components'
import { FontType } from '../../../styles/Theme'

import {
  fontTypeCss,
  styledPageCss,
  orSpanCss,
  authFormsCss,
  authDivStyleCss,
} from '../../../styles/index.styled'

export const StyledLoginPage = styled.div`
  ${styledPageCss}
`

export const LoginDiv = styled.div`
  ${authDivStyleCss}
`

export const LoginDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}

  margin-bottom: 2vh;
`

export const LoginForm = styled.form`
  ${authFormsCss}
`

export const ForgetPwdSpan = styled.span`
  width: 100%;
  margin-top: 0.5vh;
`

export const ForgetPwdLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  float: right;
  margin-right: 1vw;

  font-weight: 700;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.normal};
  }
`

export const OrSpan = styled.div`
  ${orSpanCss}
`

export const NewUserSpan = styled.span<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  margin-top: 24px;
`

export const SignUpLink = styled.a<{ fontType: FontType }>`
  ${fontTypeCss}
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.palette.highlight.normal};
  }
`
