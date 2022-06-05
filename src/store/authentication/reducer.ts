import { Reducer } from 'redux'

import {
  AUTH_ACTIONS,
  ActionTypes,
  Credentials,
  LoginStatus,
  SignupStatus,
  UserData,
  FirebaseProfile,
} from './types'

// TODO remove IS_USING_BACKEND, and relook some state values are not needed
type BinaryBool = 1 | 0
export const IS_USING_BACKEND: BinaryBool = 1

export const defaultUserFirebaseProfile: FirebaseProfile = {
  email: '',
  emailVerified: false,
  uid: '',
}

export const defaultUserData: UserData = {
  name: '',
  username: '',
  phone: '',
  postal: '',
  address: '',
  gender: '',
  dob: 0,
  firebaseUID: '',
}

const loginCredentialsDefault: Credentials = {
  email: '',
  password: '',
}

const initialState: State = {
  loginAttemptStatus: 'INITIAL',
  signupAttemptStatus: 'INITIAL',
  alwaysLoggedInChecked: false,

  loginCredentialsOffline: loginCredentialsDefault,
}

type State = {
  loginAttemptStatus: LoginStatus
  signupAttemptStatus: SignupStatus
  alwaysLoggedInChecked: boolean

  // for offline testing
  loginCredentialsOffline: Credentials
}

export const auth_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_OFFLINE:
      return {
        ...state,
        loginCredentialsOffline: action.loginCredentialsOffline,
        loginAttemptStatus: action.loginAttemptStatus,
      }
    case AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS:
      return { ...state, loginAttemptStatus: action.loginAttemptStatus }
    case AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS:
      return { ...state, signupAttemptStatus: action.signupAttemptStatus }
    case AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX:
      return { ...state, alwaysLoggedInChecked: action.alwaysLoggedInChecked }
    default:
      return state
  }
}
