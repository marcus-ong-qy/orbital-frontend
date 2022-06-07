import styled from 'styled-components'
import { FontType } from '../../../../styles/Theme'
import Button from '../../../../components/common/Button/Button'

import {
  fontTypeCss,
  styledPageCss,
  orSpanCss,
  authFormsCss,
  authDivStyleCss,
} from '../../../../styles/index.styled'

export const StyledSignupPage = styled.div`
  ${styledPageCss}
`

export const SignupDiv = styled.div`
  ${authDivStyleCss}
`

export const SignupDivTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
`

export const SignupForm = styled.form`
  ${authFormsCss}
`

export const SignupWarningDiv = styled.div`
  margin-top: 10px;
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
