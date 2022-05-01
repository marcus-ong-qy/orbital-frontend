import {
  Dispatch,
  GetState,
  ActionTypes,
  ACTIONS,
  LoginCredentials,
} from "./types";

export const logIn =
  (credentials: LoginCredentials) =>
  (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const url = "https://orbital-mocha.vercel.app/auth/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((resp) => resp.json())
      .then(() => {
        dispatch({
          type: ACTIONS.LOGIN,
          loginCredentials: { ...credentials },
        });
      })
      .catch((err) => alert(err));
  };

export const logInOffline =
  (credentials: LoginCredentials) =>
  (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    dispatch({
      type: ACTIONS.LOGIN,
      loginCredentials: { ...credentials },
    });
  };
