import {
  Dispatch,
  GetState,
  ActionTypes,
  ACTIONS,
  LoginCredentials,
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
      .then(() => {
        dispatch({
          type: ACTIONS.LOGIN,
          loginCredentials: { ...credentials },
          loginAttemptInvalid: false,
        });
      })
      .catch((err) => {
        alert(err);
        dispatch({
          type: ACTIONS.LOGIN_ATTEMPT_STATUS,
          loginAttemptInvalid: true,
        });
      });
  };

export const logInOffline =
  (credentials: LoginCredentials) =>
  (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    dispatch({
      type: ACTIONS.LOGIN,
      loginCredentials: { ...credentials },
      loginAttemptInvalid: true,
    });
  };
