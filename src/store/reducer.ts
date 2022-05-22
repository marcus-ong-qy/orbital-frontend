import { Reducer } from 'redux';

import { ACTIONS, ActionTypes, LoginCredentials, LoginStatus } from './types';

type BinaryBool = 1 | 0;
export const IS_USING_BACKEND: BinaryBool = 0;

const loginCredentialsDefault: LoginCredentials = {
  username: '',
  passwordInput: '',
};

const initialState: State = {
  loginCredentials: loginCredentialsDefault,
  loginAttemptStatus: 'initial',
};

type State = {
  loginCredentials: LoginCredentials;
  loginAttemptStatus: LoginStatus;
};

export const neigh_reducer: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        loginCredentials: action.loginCredentials,
        loginAttemptStatus: action.loginAttemptStatus,
      };
    case ACTIONS.LOGIN_ATTEMPT_STATUS:
      return { ...state, loginAttemptStatus: action.loginAttemptStatus };
    default:
      return state;
  }
};
