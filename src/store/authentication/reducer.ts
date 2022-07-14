import { Reducer } from 'redux'

import {
  AUTH_ACTIONS,
  ActionTypes,
  Credentials,
  LoginStatus,
  SignupStatus,
  UserData,
  FirebaseProfile,
  ThemeMode,
  UpdateParticularsStatus,
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
  gender: '-',
  birthday: 0,
  imageURL: '',
}

const loginCredentialsDefault: Credentials = {
  email: '',
  password: '',
}

const initialState: State = {
  themeMode: 'light',

  isLoading: false,
  isLoggedIn: false,
  alwaysLoggedInChecked: false,

  loginAttemptStatus: 'INITIAL',
  signupAttemptStatus: 'INITIAL',
  updateParticularsStatus: 'INITIAL',

  userFirebaseProfile: defaultUserFirebaseProfile,
  userData: defaultUserData,

  searchbarDropdownOpen: false,
  searchRedirect: 'initial',

  loginCredentialsOffline: loginCredentialsDefault,
}

type State = {
  themeMode: ThemeMode

  isLoading: boolean
  isLoggedIn: boolean
  alwaysLoggedInChecked: boolean

  loginAttemptStatus: LoginStatus
  signupAttemptStatus: SignupStatus
  updateParticularsStatus: UpdateParticularsStatus

  userFirebaseProfile: FirebaseProfile
  userData: UserData

  searchbarDropdownOpen: boolean
  searchRedirect: 'redirect' | 'initial'

  // for offline testing
  loginCredentialsOffline: Credentials
}

export const auth_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_THEME:
      return { ...state, themeMode: action.themeMode }
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.isLoading }
    case AUTH_ACTIONS.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn }

    case AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS:
      return { ...state, loginAttemptStatus: action.loginAttemptStatus }
    case AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS:
      return { ...state, signupAttemptStatus: action.signupAttemptStatus }
    case AUTH_ACTIONS.UPDATE_PARTICULARS_STATUS:
      return { ...state, updateParticularsStatus: action.updateParticularsStatus }

    case AUTH_ACTIONS.EDIT_PROFILE:
      return {
        ...state,
        userData: action.userData,
        updateParticularsStatus: action.updateParticularsStatus,
      }
    case AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX:
      return { ...state, alwaysLoggedInChecked: action.alwaysLoggedInChecked }

    case AUTH_ACTIONS.SET_USER_FIREBASE_PROFILE:
      return { ...state, userFirebaseProfile: action.userFirebaseProfile }
    case AUTH_ACTIONS.SET_USER_DATA:
      return { ...state, userData: action.userData }

    case AUTH_ACTIONS.SET_SEARCH_DROPDOWN:
      return { ...state, searchbarDropdownOpen: action.searchbarDropdownOpen }
    case AUTH_ACTIONS.SET_SEARCH_REDIRECT:
      return { ...state, searchRedirect: action.searchRedirect }

    case AUTH_ACTIONS.LOGIN_OFFLINE:
      return {
        ...state,
        loginCredentialsOffline: action.loginCredentialsOffline,
        loginAttemptStatus: action.loginAttemptStatus,
      }
    default:
      return state
  }
}
