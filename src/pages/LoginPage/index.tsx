import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { LoginCredentials } from '../../store/types';
import { logIn, logInOffline } from '../../store/actions';
import { IS_USING_BACKEND } from '../../store/reducer';

import {
  StyledLoginPage,
  LoginForm,
  StyledInput,
  StyledPasswordInput,
  StyledButton,
  LinksDiv,
  RegisterLink,
  ForgetPwdLink,
  NeighLogo,
} from './styles/LoginPage.styled';

import neighLogoTransparent from '../../assets/Neigh-logos_transparent.png';
import { PATHS } from '../../routes/PATHS';
import { navBarBuffer } from '../../components/navigation/styles/Navbars.styled';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultCredentials: LoginCredentials = {
    username: '',
    passwordInput: '',
  };

  const [loginCredentials, setLoginCredentials] = useState(defaultCredentials);

  return (
    <StyledLoginPage>
      <div style={{ height: navBarBuffer }} />
      <h1>Log In Page</h1>
      {/* <NeighLogo src={neighLogoTransparent} />
      <LoginForm>
        <StyledInput
          placeholder="Username"
          value={loginCredentials.username}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              username: e.target.value,
            })
          }
        />
        <StyledPasswordInput
          placeholder="Password"
          value={loginCredentials.passwordInput}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              passwordInput: e.target.value,
            })
          }
        />
        <StyledButton
          // role="button"
          onClick={() => {
            dispatch(
              IS_USING_BACKEND
                ? logIn(loginCredentials)
                : logInOffline(loginCredentials)
            );
            navigate(PATHS.MAIN);
          }}>
          Login
        </StyledButton>
        <LinksDiv>
          <RegisterLink
            onClick={() => {
              navigate(PATHS.REGISTER);
            }}>
            Register
          </RegisterLink>
          <ForgetPwdLink
            onClick={() => {
              navigate(PATHS.FORGET_PASSWORD);
            }}>
            Forget Password
          </ForgetPwdLink>
        </LinksDiv>
      </LoginForm> */}
    </StyledLoginPage>
  );
};

export default LoginPage;
