import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../store/types';
import {
  logIn,
  logInOffline,
  setLoginAttemptStatus,
} from '../../store/actions';
import { IS_USING_BACKEND } from '../../store/reducer';
import { PATHS } from '../../routes/PATHS';

import { theme } from '../../styles/Theme';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';

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
  const { register, handleSubmit, setValue } = useForm({ mode: 'onSubmit' });
  const { loginAttemptStatus } = useSelector(
    (state: RootState) => state.neigh_reducer
  );
  const { h1, p, labelFont } = { ...theme.typography.fontSize };

  useEffect(() => {
    if (loginAttemptStatus === 'success') {
      navigate(PATHS.MAIN);
      dispatch(setLoginAttemptStatus('initial'));
    }
  }, [loginAttemptStatus]);

  const onSubmit = (data: FieldValues) => {
    const loginCredentials = {
      username: data.UsernameEmail.trim(),
      passwordInput: data.Password,
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            title="UsernameEmail"
            placeholder="Username/Email"
            register={register}
            pattern={/.+/}
            required
          />
          <PasswordInputField
            title="Password"
            type="login"
            placeholder="Password"
            errorLabel="User/Password Invalid!"
            isError={loginAttemptStatus === 'invalid'}
            register={register}
            setValue={setValue}
            pattern={/.+/i}
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
