import { Reducer } from 'redux';

import {
  ACTIONS,
  ActionTypes,
  Credentials,
  LoginStatus,
  SignupStatus,
} from './types';

type BinaryBool = 1 | 0;
export const IS_USING_BACKEND: BinaryBool = 1;

const loginCredentialsDefault: Credentials = {
  email: '',
  password: '',
};

const initialState: State = {
  loginCredentials: loginCredentialsDefault,
  loginAttemptStatus: 'initial',
  signupAttemptStatus: 'initial',
};

type State = {
  loginCredentials: Credentials;
  loginAttemptStatus: LoginStatus;
  signupAttemptStatus: SignupStatus;
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
    case ACTIONS.SIGNUP_ATTEMPT_STATUS:
      return { ...state, signupAttemptStatus: action.signupAttemptStatus };
    default:
      return state;
  }
};
