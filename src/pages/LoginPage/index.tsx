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
  LoginDiv,
  LoginDivTitle,
  StyledLoginPage,
  // LoginForm,
  // LinksDiv,
  // RegisterLink,
  // ForgetPwdLink,
  // NeighLogo,
} from './styles/LoginPage.styled';

// import neighLogoTransparent from '../../assets/Neigh-logos_transparent.png';
import {
  StyledInput,
  StyledPasswordInput,
} from '../../components/InputField/styles/InputFields.styled';
import InputField from '../../components/InputField/InputField';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { h1 } = { ...theme.typography.fontSize };

  const defaultCredentials: LoginCredentials = {
    username: '',
    passwordInput: '',
  };

  const [loginCredentials, setLoginCredentials] = useState(defaultCredentials);

  return (
    <StyledLoginPage>
      <LoginDiv>
        <LoginDivTitle fontType={h1}>Log In</LoginDivTitle>
        <InputField
          placeholder="Username"
          leftLabel="Left Label"
          rightLabel="Right Label"
          leftIsError={true}
          rightIsError={1}
          // value={loginCredentials.username}
          // onChange={(e) =>
          //   setLoginCredentials({
          //     ...loginCredentials,
          //     username: e.target.value,
          //   })
          // }
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
        Remember Me
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
        <a onClick={() => navigate(PATHS.FORGET_PASSWORD)}>Forget Password?</a>
        <u>
          <b>
            <h2>or</h2>
          </b>
        </u>
        <span>
          <b>G</b>&nbsp; Log In With Google
        </span>
        New to this site? Sign Up here!
      </LoginDiv>

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
