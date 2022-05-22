import { Reducer } from 'redux';

import { ACTIONS, ActionTypes, Credentials, LoginStatus } from './types';

type BinaryBool = 1 | 0;
export const IS_USING_BACKEND: BinaryBool = 1;

const loginCredentialsDefault: Credentials = {
  email: '',
  password: '',
};

const initialState: State = {
  loginCredentials: loginCredentialsDefault,
  loginAttemptStatus: 'initial',
};

type State = {
  loginCredentials: Credentials;
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
