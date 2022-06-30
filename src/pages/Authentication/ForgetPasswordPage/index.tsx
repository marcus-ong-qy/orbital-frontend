import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import { sendPasswordReset } from '../../../store/authentication/actions'
import { IS_USING_BACKEND } from '../../../store/authentication/reducer'
import { ResetPasswordStatus } from '../../../store/authentication/types'
import { RESET_PASSWORD_ERROR_LABELS } from '../../../common/warnings'
import { TEXTS } from '../../../common/texts'

import InputField from '../../../components/common/InputFields/InputField'
import WarningLabels from '../../../components/common/WarningLabels/WarningLabels'

import {
  ForgetPasswordDiv,
  ForgetPasswordForm,
  ForgetPasswordTitle,
  HorseHead,
  ResetEmailMsg,
  ResetPasswordButton,
  StyledForgetPasswordPage,
} from './styles/ForgetPasswordPage.styled'

import confusedHorse from '../../../assets/Horse-confused.png'

const ForgetPasswordPage = () => {
  const theme = useTheme()
  const { register, handleSubmit } = useForm()
  const { h1, p } = { ...theme.typography.fontSize }

  const [resetPasswordAttemptStatus, setResetPasswordAttemptStatus] =
    useState<ResetPasswordStatus>('INITIAL')

  const resetPasswordErrorLabel = RESET_PASSWORD_ERROR_LABELS[resetPasswordAttemptStatus]

  const onSubmit = (data: FieldValues) => {
    const email = data.Email.trim()
    IS_USING_BACKEND && sendPasswordReset(email, setResetPasswordAttemptStatus)
  }

  return (
    <StyledForgetPasswordPage>
      <ForgetPasswordDiv>
        <ForgetPasswordTitle fontType={h1}>Forget Password</ForgetPasswordTitle>
        <HorseHead src={confusedHorse} />
        <ResetEmailMsg fontType={p}>{TEXTS.RESET_PWD_INSTRUCTIONS}</ResetEmailMsg>
        <ForgetPasswordForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField title="Email" placeholder="Email" register={register} />
          <WarningLabels
            label={resetPasswordErrorLabel}
            isError={resetPasswordErrorLabel.length !== 0}
          />
          <ResetPasswordButton type="submit" text="Reset Password" />
        </ForgetPasswordForm>
      </ForgetPasswordDiv>
    </StyledForgetPasswordPage>
  )
}

export default ForgetPasswordPage
