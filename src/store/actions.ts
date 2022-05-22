import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { demoAcc } from '../firebase-config';
import {
  Dispatch,
  ActionTypes,
  ACTIONS,
  Credentials,
  LoginStatus,
} from './types';

export const logIn =
  (credentials: Credentials) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      dispatch(setLoginCredentials(credentials));
    } catch (err) {
      dispatch(setLoginAttemptStatus('invalid'));
    }
  };

export const signUp =
  (credentials: Credentials) => async (dispatch: Dispatch<ActionTypes>) => {
    // TODO
  };

const setLoginCredentials =
  (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: ACTIONS.LOGIN,
      loginCredentials: { ...credentials },
      loginAttemptStatus: 'success',
    });
  };

export const setLoginAttemptStatus =
  (status: LoginStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: ACTIONS.LOGIN_ATTEMPT_STATUS,
      loginAttemptStatus: status,
    });
  };

// offline functions
export const logInOffline =
  (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>) => {
    const loginMatch = () => {
      return (
        credentials.email === demoAcc.email &&
        credentials.password === demoAcc.password
      );
    };
    loginMatch()
      ? dispatch(setLoginCredentials(credentials))
      : dispatch(setLoginAttemptStatus('invalid'));
  };
