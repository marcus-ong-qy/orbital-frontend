import { Reducer } from 'redux'

import { AUTH_ACTIONS, ActionTypes, Credentials, LoginStatus, SignupStatus } from './types'

// TODO remove IS_USING_BACKEND, and relook some state values are not needed
type BinaryBool = 1 | 0
export const IS_USING_BACKEND: BinaryBool = 1

export const defaultUserProfile = {
  displayName: '',
  email: '',
  photoURL: '',
  emailVerified: false,
  uid: '',
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
