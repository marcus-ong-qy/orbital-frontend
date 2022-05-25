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
import { SIGNUP, signupErrorLabels } from '../../common/warnings';

import Button from '../../components/Button/Button';
import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';
import WarningLabels from '../../components/WarningLabels/WarningLabels';

import {
  ExistingUserSpan,
  LoginLink,
  SignUpDiv,
  SignUpDivTitle,
  SignUpWarningDiv,
  StyledSignUpPage,
} from './styles/RegisterPage.styled';

// TODO make label go away when exit page
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

  const { h1, p } = { ...theme.typography.fontSize };

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
  }, [signupAttemptStatus, dispatch, navigate]);

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
            errorLabel={SIGNUP.EMAIL_INVALID}
            isError={errors.Email}
            register={register}
            pattern={emailRegex}
            required
          />
          <PasswordInputField
            title="Password"
            type="signup"
            placeholder="Password"
            errorLabel={SIGNUP.PASSWORD_INVALID}
            isError={errors.Password}
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            pattern={passwordRegex}
            required
          />
          <Button style={{ marginTop: '1vh' }} type="submit" text="Sign Up" />
        </form>
        <ExistingUserSpan fontType={p}>
          Have an account?&nbsp;
          <LoginLink fontType={p} onClick={() => navigate(PATHS.REGISTER)}>
            Log In
          </LoginLink>
          &nbsp;here!
        </ExistingUserSpan>
      </SignUpDiv>
    </StyledSignUpPage>
  );
};

export default RegisterPage;
