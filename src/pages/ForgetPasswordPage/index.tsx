import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { theme } from '../../styles/Theme'
import { sendPasswordReset } from '../../store/actions'
import { IS_USING_BACKEND } from '../../store/reducer'
import { ResetPasswordStatus } from '../../store/types'
import { RESET_PASSWORD_ERROR_LABELS } from '../../common/warnings'
import { RESET_PWD_INSTRUCTIONS } from '../../common/texts'

import InputField from '../../components/InputFields/InputField'
import WarningLabels from '../../components/WarningLabels/WarningLabels'

import {
  ForgetPasswordDiv,
  ForgetPasswordForm,
  ForgetPasswordTitle,
  HorseHead,
  ResetEmailMsg,
  ResetPasswordButton,
  StyledForgetPasswordPage,
} from './styles/ForgetPasswordPage.styled'

import confusedHorse from '../../assets/Horse-confused.png'

const ForgetPasswordPage = () => {
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
        <ResetEmailMsg fontType={p}>{RESET_PWD_INSTRUCTIONS}</ResetEmailMsg>
        <ForgetPasswordForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField title="Email" placeholder="Email Address" register={register} />
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
