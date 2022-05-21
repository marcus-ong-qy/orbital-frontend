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

export type LoginCredentials = {
  username: string;
  passwordInput: string;
};

/** Actions' types */

export enum ACTIONS {
  LOGIN = 'ACTIONS.LOGIN',
  LOGIN_ATTEMPT_STATUS = 'ACTIONS.LOGIN_ATTEMPT_STATUS',
}

/** Actions */

export type LogIn = {
  type: typeof ACTIONS.LOGIN;
  loginCredentials: LoginCredentials;
  loginAttemptInvalid: boolean;
};

export type LoginAttemptStatus = {
  type: typeof ACTIONS.LOGIN_ATTEMPT_STATUS;
  loginAttemptInvalid: boolean;
};

export type ActionTypes = LogIn | LoginAttemptStatus;
