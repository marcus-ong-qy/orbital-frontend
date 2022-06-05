/** Types */
export type ProfileInfo = {
  displayName: string | null
  email: string | null
  photoURL: string | null
  emailVerified: boolean
  uid: string | null
}

export type Credentials = {
  email: string
  password: string
}

export type LoginStatus = 'INITIAL' | 'INVALID' | 'SUCCESS'
export type SignupStatus = 'INITIAL' | 'ACCOUNT_EXISTS' | 'EMAIL_INVALID' | 'ERROR' | 'SUCCESS'

// not stored in store
export type ResetPasswordStatus =
  | 'INITIAL'
  | 'ACCOUNT_DOESNT_EXIST'
  | 'EMAIL_INVALID'
  | 'ERROR'
  | 'SUCCESS'

/** Actions' types */

export enum AUTH_ACTIONS {
  LOGIN_OFFLINE = 'AUTH_ACTIONS.LOGIN_OFFLINE',
  LOGIN_ATTEMPT_STATUS = 'AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS',
  SIGNUP_ATTEMPT_STATUS = 'AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS',
  ALWAYS_LOGGED_IN_CHECKBOX = 'AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX',
}

/** Actions */

type LogInOffline = {
  type: typeof AUTH_ACTIONS.LOGIN_OFFLINE
  loginCredentialsOffline: Credentials
  loginAttemptStatus: LoginStatus
}

type LoginAttemptStatus = {
  type: typeof AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS
  loginAttemptStatus: LoginStatus
}

type SignupAttemptStatus = {
  type: typeof AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS
  signupAttemptStatus: SignupStatus
}

type AlwaysLoggedInCheckbox = {
  type: typeof AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX
  alwaysLoggedInChecked: boolean
}

export type ActionTypes =
  | LogInOffline
  | LoginAttemptStatus
  | SignupAttemptStatus
  | AlwaysLoggedInCheckbox
