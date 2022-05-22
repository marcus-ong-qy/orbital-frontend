import {
  Dispatch,
  GetState,
  ActionTypes,
  ACTIONS,
  LoginCredentials,
  LoginStatus,
} from './types';

export const logIn =
  (credentials: LoginCredentials) =>
  (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const url = 'https://orbital-mocha.vercel.app/auth/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((resp) => resp.json())
      .then(() => dispatch(setLoginCredentials(credentials)))
      .catch(() => dispatch(setLoginAttemptStatus('invalid')));
  };

export const demoAcc: LoginCredentials = {
  username: 'grazinghorse',
  passwordInput: 'bngo2646!',
};

export const logInOffline =
  (credentials: LoginCredentials) =>
  (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const loginMatch = () => {
      return (
        credentials.username === demoAcc.username &&
        credentials.passwordInput === demoAcc.passwordInput
      );
    };
    loginMatch()
      ? dispatch(setLoginCredentials(credentials))
      : dispatch(setLoginAttemptStatus('invalid'));
  };

const setLoginCredentials =
  (credentials: LoginCredentials) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: ACTIONS.LOGIN,
      loginCredentials: { ...credentials },
      loginAttemptStatus: 'success',
    });
  };

export const setLoginAttemptStatus =
  (status: LoginStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: ACTIONS.LOGIN_ATTEMPT_STATUS,
      loginAttemptStatus: status,
    });
  };
