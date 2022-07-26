import styled, { FontType } from 'styled-components'
import Button from '../../../../components/common/Button/Button'

import { authDivStyleCss, fontTypeCss, styledPageCss } from '../../../../styles/index.styled'

export const StyledForgetPasswordPage = styled.div`
  ${styledPageCss}
`

export const ForgetPasswordDiv = styled.div`
  ${authDivStyleCss}
`

export const ForgetPasswordTitle = styled.div<{ fontType: FontType }>`
  ${fontTypeCss}
  height: 50px;

  line-height: 1.1;
`

export const HorseHead = styled.img`
  width: 194px;
  height: 194px;
`

export const ResetEmailMsg = styled.div<{ fontType: FontType }>`
  height: 27px;
`

export const ForgetPasswordForm = styled.form`
  width: 100%;
`

export const ResetPasswordButton = styled(Button)`
  margin-top: 1vh;
`
