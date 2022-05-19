import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { LoginCredentials } from '../../store/types';
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
} from './styles/LoginPage.styled';

import InputField from '../../components/InputFields/InputField';
import PasswordInputField from '../../components/InputFields/PasswordInputField';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { h1, p, labelFont } = { ...theme.typography.fontSize };

  const defaultCredentials: LoginCredentials = {
    username: '',
    passwordInput: '',
  };

  const [loginCredentials, setLoginCredentials] = useState(defaultCredentials);

  return (
    <StyledLoginPage>
      <LoginDiv>
        <LoginDivTitle fontType={h1}>Log In</LoginDivTitle>
        <InputField placeholder="Username/Email" />
        <PasswordInputField
          type="login"
          placeholder="Password"
          errorLabel="User/Password Invalid!"
          isError={true}
        />
        <Button
          label="Login"
          onClick={() => {
            dispatch(
              IS_USING_BACKEND
                ? logIn(loginCredentials)
                : logInOffline(loginCredentials)
            );
            navigate(PATHS.MAIN);
          }}
        />
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
