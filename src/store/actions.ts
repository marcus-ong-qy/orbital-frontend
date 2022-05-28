import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

import { auth, db } from '../firebase'
import { demoAcc } from '../demo-config'
import {
  Dispatch,
  ActionTypes,
  ACTIONS,
  Credentials,
  LoginStatus,
  SignupStatus,
  ResetPasswordStatus,
  GetState,
} from './types'

export const logIn =
  (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const { alwaysLoggedInChecked } = getState().neigh_reducer

    const persistenceType = alwaysLoggedInChecked
      ? browserLocalPersistence
      : browserSessionPersistence

    setPersistence(auth, persistenceType)
      .then(() => {
        return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      })
      .then(() => dispatch(setLoginAttemptStatus('success')))
      .catch((error) => {
        console.error(error)
        dispatch(setLoginAttemptStatus('invalid'))
      })
  }

export const logInWithGoogle =
  () => async (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    // // TODO not yet implemented
    // try {
    //   const res = await signInWithPopup(auth, googleProvider);
    //   const user = res.user;
    //   const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    //   const docs = await getDocs(q);
    //   if (docs.docs.length === 0) {
    //     await addDoc(collection(db, 'users'), {
    //       uid: user.uid,
    //       name: user.displayName,
    //       authProvider: 'google',
    //       email: user.email,
    //     });
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  }

const readSignupError = (err: any) => {
  switch (`${err}`) {
    case 'FirebaseError: Firebase: Error (auth/email-already-in-use).':
      return 'account-exists'
    case 'FirebaseError: Firebase: Error (auth/invalid-email).':
      return 'email-invalid'
    default:
      return 'error'
  }
}

export const signUp = (credentials: Credentials) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email: credentials.email,
    })
    dispatch(setSignupAttemptStatus('success'))
  } catch (err) {
    console.error(err)
    dispatch(setSignupAttemptStatus(readSignupError(err)))
  }
}

const readResetPasswordError = (err: any) => {
  switch (`${err}`) {
    case 'FirebaseError: Firebase: Error (auth/user-not-found).':
      return 'account-doesnt-exist'
    case 'FirebaseError: Firebase: Error (auth/invalid-email).':
      return 'email-invalid'
    default:
      return 'error'
  }
}

export const sendPasswordReset = async (
  email: string,
  setResetPasswordAttemptStatus: React.Dispatch<React.SetStateAction<ResetPasswordStatus>>
) => {
  // no need to dispatch
  try {
    await sendPasswordResetEmail(auth, email)
    setResetPasswordAttemptStatus('success')
  } catch (err) {
    console.error(err)
    setResetPasswordAttemptStatus(readResetPasswordError(err))
  }
}

export const setLoginAttemptStatus = (status: LoginStatus) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: ACTIONS.LOGIN_ATTEMPT_STATUS,
    loginAttemptStatus: status,
  })
}

export const setSignupAttemptStatus =
  (status: SignupStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: ACTIONS.SIGNUP_ATTEMPT_STATUS,
      signupAttemptStatus: status,
    })
  }

export const toggleAlwaysLoggedInCheckbox =
  () => (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const { alwaysLoggedInChecked } = getState().neigh_reducer
    dispatch({
      type: ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX,
      alwaysLoggedInChecked: !alwaysLoggedInChecked,
    })
  }

// offline functions for offline testing
const setLoginCredentials = (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: ACTIONS.LOGIN_OFFLINE,
    loginCredentialsOffline: { ...credentials },
    loginAttemptStatus: 'success',
  })
}

export const logInOffline = (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>) => {
  const loginMatch = () => {
    return credentials.email === demoAcc.email && credentials.password === demoAcc.password
  }
  loginMatch()
    ? dispatch(setLoginCredentials(credentials))
    : dispatch(setLoginAttemptStatus('invalid'))
}
