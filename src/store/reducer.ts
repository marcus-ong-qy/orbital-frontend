import { Reducer } from "redux";

import { ACTIONS, ActionTypes, LoginCredentials } from "./types";

type BinaryBool = 1 | 0;
export const IS_USING_BACKEND: BinaryBool = 0;

const loginCredentialsDefault: LoginCredentials = {
  username: "",
  passwordInput: "",
};

const initialState: State = {
  loginCredentials: loginCredentialsDefault,
};

type State = {
  loginCredentials: LoginCredentials;
};

export const neigh_reducer: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, loginCredentials: action.loginCredentials };
    default:
      return state;
  }
};
