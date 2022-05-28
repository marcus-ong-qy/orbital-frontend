import { Reducer } from 'redux';

import {
  ACTIONS,
  ActionTypes,
  Credentials,
  LoginStatus,
  SignupStatus,
  UserProfile,
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
  userProfile: defaultUserProfile,
  loginCredentials: loginCredentialsDefault,
  loginAttemptStatus: 'initial',
  signupAttemptStatus: 'initial',
  alwaysLoggedInChecked: false,
};

type State = {
  userProfile: UserProfile; // FIXME may not be needed as well
  loginCredentials: Credentials; // FIXME may not be needed
  loginAttemptStatus: LoginStatus;
  signupAttemptStatus: SignupStatus;
  alwaysLoggedInChecked: boolean;
};

export const neigh_reducer: Reducer<State, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ACTIONS.GET_USER_PROFILE:
      return { ...state, userProfile: action.userProfile };
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
    case ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX:
      return { ...state, alwaysLoggedInChecked: action.alwaysLoggedInChecked };
    default:
      return state;
  }
};
