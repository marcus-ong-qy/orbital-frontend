import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { theme } from '../../styles/Theme';
import { useAppDispatch } from '../../app/hooks';
import { sendPasswordReset } from '../../store/actions';
import { IS_USING_BACKEND } from '../../store/reducer';
import { ResetPasswordStatus } from '../../store/types';
import { resetPasswordErrorLabels } from '../../common/warnings';
import { RESET_PWD_INSTRUCTIONS } from '../../common/texts';

import InputField from '../../components/InputFields/InputField';
import Button from '../../components/Button/Button';
import WarningLabels from '../../components/WarningLabels/WarningLabels';

import {
  ForgetPasswordDiv,
  ForgetPasswordForm,
  ForgetPasswordTitle,
  HorseHead,
  ResetEmailMsg,
  StyledForgetPasswordPage,
} from './styles/ForgetPasswordPage.styled';

import confusedHorse from '../../assets/Horse-confused.png';

const ForgetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const { h1, p } = { ...theme.typography.fontSize };

  const [resetPasswordAttemptStatus, setResetPasswordAttemptStatus] =
    useState<ResetPasswordStatus>('initial');

  const onSubmit = (data: FieldValues) => {
    const email = data.Email.trim();
    IS_USING_BACKEND &&
      dispatch(sendPasswordReset(email, setResetPasswordAttemptStatus));
  };

  const resetPasswordErrorLabel =
    resetPasswordErrorLabels[resetPasswordAttemptStatus];

  return (
    <StyledForgetPasswordPage>
      <ForgetPasswordDiv>
        <ForgetPasswordTitle fontType={h1}>Forget Password</ForgetPasswordTitle>
        <HorseHead src={confusedHorse} />
        <ResetEmailMsg fontType={p}>{RESET_PWD_INSTRUCTIONS}</ResetEmailMsg>
        <ForgetPasswordForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            title="Email"
            placeholder="Email Address"
            register={register}
          />
          <WarningLabels
            label={resetPasswordErrorLabel}
            isError={resetPasswordErrorLabel.length !== 0}
          />
          <Button type="submit" text="Reset Password" />
        </ForgetPasswordForm>
      </ForgetPasswordDiv>
    </StyledForgetPasswordPage>
  );
};

export default ForgetPasswordPage;
