import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { theme } from '../../styles/Theme';
import { useAppDispatch } from '../../app/hooks';
import { emailRegex, passwordRegex } from '../../common/regex';
import { Credentials, RootState } from '../../store/types';
import { setSignupAttemptStatus, signUp } from '../../store/actions';
import { IS_USING_BACKEND } from '../../store/reducer';
import { PATHS } from '../../routes/PATHS';

import Button from '../../components/Button/Button';
import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';
import WarningLabels from '../../components/WarningLabels/WarningLabels';

import {
  SignUpDiv,
  SignUpDivTitle,
  SignUpWarningDiv,
  StyledSignUpPage,
} from './styles/RegisterPage.styled';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const { h1 } = { ...theme.typography.fontSize };

  const { signupAttemptStatus } = useSelector(
    (state: RootState) => state.neigh_reducer
  );

  const onSubmit = (data: FieldValues) => {
    const signUpCredentials: Credentials = {
      email: data.Email.trim(),
      password: data.Password,
    };
    IS_USING_BACKEND && dispatch(signUp(signUpCredentials));
  };

  useEffect(() => {
    if (signupAttemptStatus === 'success') {
      navigate(PATHS.LOGIN);
      dispatch(setSignupAttemptStatus('redirect'));
    }
  }, [signupAttemptStatus]);

  enum signupErrorLabels {
    'initial' = '',
    'account-exists' = 'An account has been created with this email!',
    'email-invalid' = 'Email used is invalid!',
    'error' = 'Error when creating account!',
    'redirect' = '',
    'success' = '',
  };

  const signupErrorLabel = signupErrorLabels[signupAttemptStatus];

  return (
    <StyledSignUpPage data-testid="register-page">
      <SignUpDiv>
        <SignUpDivTitle fontType={h1}>Sign Up</SignUpDivTitle>
        <SignUpWarningDiv>
          <WarningLabels
            label={signupErrorLabel}
            isError={signupErrorLabel.length !== 0}
          />
        </SignUpWarningDiv>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            title="Email"
            placeholder="Email"
            errorLabel="Please enter a valid email address"
            isError={errors.Email}
            register={register}
            pattern={emailRegex}
            required
          />
          <PasswordInputField
            title="Password"
            type="signup"
            placeholder="Password"
            errorLabel="Must be 8 or more characters and contain alphanumeric/symbols"
            isError={errors.Password}
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            pattern={passwordRegex}
            required
          />
          <Button style={{ marginTop: '3vh' }} type="submit" text="Sign Up" />
        </form>
      </SignUpDiv>
    </StyledSignUpPage>
  );
};

export default RegisterPage;
