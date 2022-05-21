import { Reducer } from 'redux';

import { ACTIONS, ActionTypes, LoginCredentials } from './types';

type BinaryBool = 1 | 0;
export const IS_USING_BACKEND: BinaryBool = 0;

const loginCredentialsDefault: LoginCredentials = {
  username: '',
  passwordInput: '',
};

const initialState: State = {
  loginCredentials: loginCredentialsDefault,
  loginAttemptInvalid: false,
};

type State = {
  loginCredentials: LoginCredentials;
  loginAttemptInvalid: boolean;
};

export const neigh_reducer: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, loginCredentials: action.loginCredentials };
    case ACTIONS.LOGIN_ATTEMPT_STATUS:
      return { ...state, loginAttemptInvalid: action.loginAttemptInvalid };
    default:
      return state;
  }
};
