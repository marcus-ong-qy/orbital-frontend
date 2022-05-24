import { Action } from 'redux';
import { rootReducer } from './store';

export type RootState = ReturnType<typeof rootReducer>;

type ThunkDispatch<S, A extends Action> = {
  (action: A): A;
  <R>(asyncAction: ThunkAction<R, S, A>): R;
};
type ThunkAction<R, S, A extends Action> = (
  dispatch: ThunkDispatch<S, A>,
  getState: () => S
) => R;

export type Dispatch<CustomActionTypes extends Action> = ThunkDispatch<
  RootState,
  CustomActionTypes
>;
export type GetState = () => RootState;

/** Types */

export type Credentials = {
  email: string;
  password: string;
};

export type LoginStatus = 'initial' | 'invalid' | 'success';
export type SignupStatus =
  | 'initial'
  | 'account-exists'
  | 'email-invalid'
  | 'error'
  | 'redirect'
  | 'success';

// not stored in store
export type ResetPasswordStatus =
  | 'initial'
  | 'account-doesnt-exist'
  | 'email-invalid'
  | 'error'
  | 'success';

/** Actions' types */

export enum ACTIONS {
  LOGIN = 'ACTIONS.LOGIN',
  LOGIN_ATTEMPT_STATUS = 'ACTIONS.LOGIN_ATTEMPT_STATUS',
  SIGNUP_ATTEMPT_STATUS = 'ACTIONS.SIGNUP_ATTEMPT_STATUS',
}

/** Actions */

export type LogIn = {
  type: typeof ACTIONS.LOGIN;
  loginCredentials: Credentials;
  loginAttemptStatus: LoginStatus;
};

export type LoginAttemptStatus = {
  type: typeof ACTIONS.LOGIN_ATTEMPT_STATUS;
  loginAttemptStatus: LoginStatus;
};

export type SignupAttemptStatus = {
  type: typeof ACTIONS.SIGNUP_ATTEMPT_STATUS;
  signupAttemptStatus: SignupStatus;
};

export type ActionTypes = LogIn | LoginAttemptStatus | SignupAttemptStatus;
