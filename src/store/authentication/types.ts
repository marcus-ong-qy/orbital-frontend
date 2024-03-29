/** Types */
export type ThemeMode = 'light' | 'dark'

export type FirebaseProfile = {
  email: string | null
  emailVerified: boolean
  uid: string | null
}

export type RealtimeUserData = {
  chats: Record<string, string>
  displayName: string
  email: string
  uid: string
}

export type UserData = {
  name: string
  username: string
  postal: string
  gender: string
  address: string
  birthday: number
  phone: string
  imageURL: string | undefined
}

export type Credentials = {
  email: string
  password: string
}

export type LoginStatus = 'INITIAL' | 'INVALID' | 'SUCCESS'
export type SignupStatus = 'INITIAL' | 'ACCOUNT_EXISTS' | 'EMAIL_INVALID' | 'ERROR' | 'SUCCESS'
export type UpdateParticularsStatus = 'INITIAL' | 'INVALID' | 'SUCCESS'

// not stored in store
export type ResetPasswordStatus =
  | 'INITIAL'
  | 'ACCOUNT_DOESNT_EXIST'
  | 'EMAIL_INVALID'
  | 'ERROR'
  | 'SUCCESS'

/** Actions' types */

export enum AUTH_ACTIONS {
  SET_THEME = 'AUTH_ACTIONS.SET_THEME',
  SET_LOADING = 'AUTH_ACTIONS.SET_LOADING',

  LOGIN_ATTEMPT_STATUS = 'AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS',
  SIGNUP_ATTEMPT_STATUS = 'AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS',
  UPDATE_PARTICULARS_STATUS = 'AUTH_ACTIONS.UPDATE_PARTICULARS_STATUS',

  EDIT_PROFILE = 'AUTH_ACTIONS.EDIT_PROFILE',
  ALWAYS_LOGGED_IN_CHECKBOX = 'AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX',

  SET_IS_LOGGED_IN = 'AUTH_ACTIONS.SET_IS_LOGGED_IN',
  SET_USER_FIREBASE_PROFILE = 'AUTH_ACTIONS.SET_USER_FIREBASE_PROFILE',
  SET_USER_DATA = 'AUTH_ACTIONS.SET_USER_DATA',

  SET_SEARCH_DROPDOWN = 'AUTH_ACTIONS.SET_SEARCH_DROPDOWN',
  SET_SEARCH_REDIRECT = 'AUTH_ACTIONS.SET_SEARCH_REDIRECT',
}

/** Actions */

type SetTheme = {
  type: typeof AUTH_ACTIONS.SET_THEME
  themeMode: ThemeMode
}

type SetLoading = {
  type: typeof AUTH_ACTIONS.SET_LOADING
  isLoading: boolean
}

type SetLoginAttemptStatus = {
  type: typeof AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS
  loginAttemptStatus: LoginStatus
}

type SetSignupAttemptStatus = {
  type: typeof AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS
  signupAttemptStatus: SignupStatus
}

type SetUpdateParticularsStatus = {
  type: typeof AUTH_ACTIONS.UPDATE_PARTICULARS_STATUS
  updateParticularsStatus: UpdateParticularsStatus
}

type EditProfile = {
  type: typeof AUTH_ACTIONS.EDIT_PROFILE
  userData: UserData
  updateParticularsStatus: UpdateParticularsStatus
}

type AlwaysLoggedInCheckbox = {
  type: typeof AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX
  alwaysLoggedInChecked: boolean
}

type SetIsLoggedIn = {
  type: typeof AUTH_ACTIONS.SET_IS_LOGGED_IN
  isLoggedIn: boolean
}

type SetUserData = {
  type: typeof AUTH_ACTIONS.SET_USER_DATA
  userData: UserData
}

type SetUserFirebaseProfile = {
  type: typeof AUTH_ACTIONS.SET_USER_FIREBASE_PROFILE
  userFirebaseProfile: FirebaseProfile
}

type SetSearchDropdown = {
  type: typeof AUTH_ACTIONS.SET_SEARCH_DROPDOWN
  searchbarDropdownOpen: boolean
}

type SetSearchRedirect = {
  type: typeof AUTH_ACTIONS.SET_SEARCH_REDIRECT
  searchRedirect: 'redirect' | 'initial'
}

export type ActionTypes =
  | SetTheme
  | SetLoading
  | SetLoginAttemptStatus
  | SetSignupAttemptStatus
  | SetUpdateParticularsStatus
  | EditProfile
  | AlwaysLoggedInCheckbox
  | SetIsLoggedIn
  | SetUserData
  | SetUserFirebaseProfile
  | SetSearchDropdown
  | SetSearchRedirect
