import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { theme } from '../../styles/Theme';
import { useAppDispatch } from '../../app/hooks';
import {
  logIn,
  logInOffline,
  setLoginAttemptStatus,
  setSignupAttemptStatus,
} from '../../store/actions';
import { IS_USING_BACKEND } from '../../store/reducer';
import { Credentials, RootState } from '../../store/types';
import { PATHS } from '../../routes/PATHS';
import { LOGIN, SIGNUP } from '../../common/warnings';

import Button from '../../components/Button/Button';
import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';
import WarningLabels from '../../components/WarningLabels/WarningLabels';

import {
  ForgetPwdLink,
  ForgetPwdSpan,
  LoginDiv,
  LoginDivTitle,
  NewUserSpan,
  SignUpLink,
  StyledLoginPage,
} from './styles/LoginPage.styled';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, setError } = useForm({
    mode: 'onSubmit',
  });
  const { loginAttemptStatus, signupAttemptStatus } = useSelector(
    (state: RootState) => state.neigh_reducer
  );
  const { h1, p, labelFont } = { ...theme.typography.fontSize };

  useEffect(() => {
    if (loginAttemptStatus === 'success') {
      navigate(PATHS.MAIN);
      dispatch(setLoginAttemptStatus('initial'));
      dispatch(setSignupAttemptStatus('initial'));
    }
  }, [loginAttemptStatus, dispatch, navigate]);

  const onSubmit = (data: FieldValues) => {
    const loginCredentials: Credentials = {
      email: data.Email.trim(),
      password: data.Password,
    };
    dispatch(
      IS_USING_BACKEND
        ? logIn(loginCredentials)
        : logInOffline(loginCredentials)
    );
  };

  return (
    <StyledLoginPage data-testid="login-page">
      <LoginDiv>
        <LoginDivTitle fontType={h1}>Log In</LoginDivTitle>
        <WarningLabels
          label={SIGNUP.SUCCESSFUL}
          isError={signupAttemptStatus === 'redirect'}
        />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            title="Email"
            placeholder="Email"
            register={register}
            required
          />
          <PasswordInputField
            title="Password"
            type="login"
            placeholder="Password"
            errorLabel={LOGIN.INVALID}
            isError={loginAttemptStatus === 'invalid'}
            register={register}
            setValue={setValue}
            setError={setError}
            required
          />
          <Button type="submit" text="Login" />
        </form>
        <ForgetPwdSpan>
          <ForgetPwdLink
            fontType={labelFont}
            onClick={() => navigate(PATHS.FORGET_PASSWORD)}>
            Forget Password?
          </ForgetPwdLink>
        </ForgetPwdSpan>
        <NewUserSpan fontType={p}>
          New to this site?&nbsp;
          <SignUpLink fontType={p} onClick={() => navigate(PATHS.REGISTER)}>
            Sign Up
          </SignUpLink>
          &nbsp;here!
        </NewUserSpan>
      </LoginDiv>
    </StyledLoginPage>
  );
};

export default LoginPage;
