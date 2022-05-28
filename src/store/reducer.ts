import { Reducer } from 'redux';

import {
  ACTIONS,
  ActionTypes,
  Credentials,
  LoginStatus,
  SignupStatus,
  ProfileInfo,
} from './types';

type BinaryBool = 1 | 0;
export const IS_USING_BACKEND: BinaryBool = 1;

export const defaultUserProfile = {
  displayName: '',
  email: '',
  photoURL: '',
  emailVerified: false,
  uid: '',
};

const loginCredentialsDefault: Credentials = {
  email: '',
  password: '',
};

const initialState: State = {
  loginAttemptStatus: 'initial',
  signupAttemptStatus: 'initial',
  alwaysLoggedInChecked: false,

  loginCredentialsOffline: loginCredentialsDefault,
};

type State = {
  loginAttemptStatus: LoginStatus;
  signupAttemptStatus: SignupStatus;
  alwaysLoggedInChecked: boolean;

  // for offline testing
  loginCredentialsOffline: Credentials;
};

export const neigh_reducer: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ACTIONS.LOGIN_OFFLINE:
      return {
        ...state,
        loginCredentialsOffline: action.loginCredentialsOffline,
        loginAttemptStatus: action.loginAttemptStatus,
      };
    case ACTIONS.LOGIN_ATTEMPT_STATUS:
      return { ...state, loginAttemptStatus: action.loginAttemptStatus };
    case ACTIONS.SIGNUP_ATTEMPT_STATUS:
      return { ...state, signupAttemptStatus: action.signupAttemptStatus };
    case ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX:
      return { ...state, alwaysLoggedInChecked: action.alwaysLoggedInChecked };
    default:
      return state;
  }
};
