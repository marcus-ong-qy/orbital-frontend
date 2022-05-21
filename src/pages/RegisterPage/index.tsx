import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../app/hooks';
import { LoginCredentials, RootState } from '../../store/types';
import { logIn, logInOffline } from '../../store/actions';
import { IS_USING_BACKEND } from '../../store/reducer';
import { PATHS } from '../../routes/PATHS';

import Button from '../../components/Button/Button';
import { theme } from '../../styles/Theme';

import {
  ForgetPwdLink,
  ForgetPwdSpan,
  LoginDiv,
  LoginDivTitle,
  NewUserSpan,
  SignUpLink,
  StyledLoginPage,
} from './styles/RegisterPage';

import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';
import { useSelector } from 'react-redux';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const { h1, p, labelFont } = { ...theme.typography.fontSize };

  const defaultCredentials: LoginCredentials = {
    username: '',
    passwordInput: '',
  };

  const { loginAttemptInvalid } = useSelector(
    (state: RootState) => state.neigh_reducer
  );

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const loginCredentials = {
      username: data.UsernameEmail.trim(),
      passwordInput: data.PasswordLogin,
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
        <LoginDivTitle fontType={h1}>Sign Up actually</LoginDivTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            title="UsernameEmail"
            placeholder="Username/Email"
            register={register}
            required
          />
          <PasswordInputField
            type="PasswordLogin"
            placeholder="Password"
            errorLabel="User/Password Invalid!"
            isError={loginAttemptInvalid}
            register={register}
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

export default RegisterPage;
