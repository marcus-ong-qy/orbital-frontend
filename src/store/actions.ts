import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';
import { demoAcc } from '../firebase-config';
import {
  Dispatch,
  ActionTypes,
  ACTIONS,
  Credentials,
  LoginStatus,
  SignupStatus,
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

const readSignupError = (err: any) => {
  switch (`${err}`) {
    case 'FirebaseError: Firebase: Error (auth/email-already-in-use).':
      return 'account-exists';
    case 'FirebaseError: Firebase: Error (auth/invalid-email).':
      return 'email-invalid';
    default:
      return 'error';
  }
};

export const signUp =
  (credentials: Credentials) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = res.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        authProvider: 'local',
        email: credentials.email,
      });
      dispatch(setSignupAttemptStatus('success'));
    } catch (err) {
      console.error(err);
      dispatch(setSignupAttemptStatus(readSignupError(err)));
    }
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

export const setSignupAttemptStatus =
  (status: SignupStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: ACTIONS.SIGNUP_ATTEMPT_STATUS,
      signupAttemptStatus: status,
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
