import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { auth, functions, setRealtimeDatabase } from '../../firebase'
import { demoAcc } from '../../demo-config'

import { Dispatch, GetState } from '../types'
import {
  ActionTypes,
  AUTH_ACTIONS,
  Credentials,
  LoginStatus,
  SignupStatus,
  ResetPasswordStatus,
  UserData,
  RealtimeUserData,
} from './types'
import { defaultUserData } from './reducer'
import { httpsCallable } from 'firebase/functions'

export const setIsLoading = (isLoading: boolean) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: AUTH_ACTIONS.SET_LOADING,
    isLoading: isLoading,
  })
}

export const logIn =
  (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const { alwaysLoggedInChecked } = getState().auth_reducer
    dispatch(setIsLoading(true))

    const persistenceType = alwaysLoggedInChecked
      ? browserLocalPersistence
      : browserSessionPersistence

    setPersistence(auth, persistenceType)
      .then(() => {
        return signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      })
      .then(() => {
        dispatch(setLoginAttemptStatus('SUCCESS'))
        dispatch(setIsLoading(false))
      })
      .catch((error) => {
        console.error(error)
        dispatch(setLoginAttemptStatus('INVALID'))
        dispatch(setIsLoading(false))
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
      return 'ACCOUNT_EXISTS'
    case 'FirebaseError: Firebase: Error (auth/invalid-email).':
      return 'EMAIL_INVALID'
    default:
      return 'ERROR'
  }
}

// TODO put to types

export const signUp = (credentials: Credentials) => async (dispatch: Dispatch<ActionTypes>) => {
  // TODO wj doing changes
  dispatch(setIsLoading(true))
  try {
    const res = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    const user = res.user

    const initUserData: UserData = {
      ...defaultUserData,
      username: user.email ?? '',
      // firebaseUID: user.uid,
    }

    const initRealtimeData: RealtimeUserData = {
      displayName: '',
      email: credentials.email,
      groups: [],
      uid: user.uid,
    }

    await setRealtimeDatabase(initRealtimeData)

    fetch('https://asia-southeast1-orbital2-4105d.cloudfunctions.net/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initUserData),
    })
      .then((resp) => {
        resp.status === 200 && dispatch(setSignupAttemptStatus('SUCCESS'))
      })
      .catch((err) => console.error(err))
  } catch (err) {
    console.error(err)
    dispatch(setSignupAttemptStatus(readSignupError(err)))
  } finally {
    dispatch(setIsLoading(false))
  }
}

const setUserData = (userData: UserData) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: AUTH_ACTIONS.SET_USER_DATA,
    userData: userData,
  })
}

export const getUserData_old = (user: User) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true))
  const firebaseUID = user.uid

  fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/user?user=${firebaseUID}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      return resp.json()
    })
    .then((res) => {
      const userData: UserData = res.message
      dispatch(setUserData(userData))
      dispatch(setIsLoading(false))
    })
    .catch((err) => {
      console.error(err)
      dispatch(setIsLoading(false))
    })
}

export const getUserData = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true))
  try {
    const getUserInfo = httpsCallable(functions, 'getUserInfo')
    const result = (await getUserInfo()) as any
    const success = result.data.success as boolean
    if (!success) {
      // Do some shit to handle failure on the backend
      console.log(result)
      throw new Error("get user data don't success")
    }
    console.log(result)
    const userData: UserData = result.data.message
    dispatch({
      type: AUTH_ACTIONS.SET_USER_DATA,
      userData: userData,
    })
  } catch (e) {
    console.error('The error is:\n', e as Error)
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const editUserData = (newUserData: UserData) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true))
  fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/user`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  })
    .then((resp) => {
      resp.status === 200 && dispatch(setUserData(newUserData))
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => dispatch(setIsLoading(false)))
}

const readResetPasswordError = (err: any) => {
  switch (`${err}`) {
    case 'FirebaseError: Firebase: Error (auth/user-not-found).':
      return 'ACCOUNT_DOESNT_EXIST'
    case 'FirebaseError: Firebase: Error (auth/invalid-email).':
      return 'EMAIL_INVALID'
    default:
      return 'ERROR'
  }
}

export const sendPasswordReset = async (
  email: string,
  setResetPasswordAttemptStatus: React.Dispatch<React.SetStateAction<ResetPasswordStatus>>,
) => {
  // no need to dispatch
  try {
    await sendPasswordResetEmail(auth, email)
    setResetPasswordAttemptStatus('SUCCESS')
  } catch (err) {
    console.error(err)
    setResetPasswordAttemptStatus(readResetPasswordError(err))
  }
}

export const logout = async () => {
  // no need to dispatch
  try {
    signOut(auth)
  } catch (error) {
    console.error(error)
  }
}

export const setLoginAttemptStatus = (status: LoginStatus) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: AUTH_ACTIONS.LOGIN_ATTEMPT_STATUS,
    loginAttemptStatus: status,
  })
}

export const setSignupAttemptStatus =
  (status: SignupStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: AUTH_ACTIONS.SIGNUP_ATTEMPT_STATUS,
      signupAttemptStatus: status,
    })
  }

export const toggleAlwaysLoggedInCheckbox =
  () => (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const { alwaysLoggedInChecked } = getState().auth_reducer
    dispatch({
      type: AUTH_ACTIONS.ALWAYS_LOGGED_IN_CHECKBOX,
      alwaysLoggedInChecked: !alwaysLoggedInChecked,
    })
  }

export const setSearchbarDropdownOpen = (isOpen: boolean) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: AUTH_ACTIONS.SET_SEARCH_DROPDOWN,
    searchbarDropdownOpen: isOpen,
  })
}

export const setSearchRedirect =
  (type: 'redirect' | 'initial') => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: AUTH_ACTIONS.SET_SEARCH_REDIRECT,
      searchRedirect: type,
    })
  }

// offline functions for offline testing
const setLoginCredentials = (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: AUTH_ACTIONS.LOGIN_OFFLINE,
    loginCredentialsOffline: { ...credentials },
    loginAttemptStatus: 'SUCCESS',
  })
}

export const logInOffline = (credentials: Credentials) => (dispatch: Dispatch<ActionTypes>) => {
  const loginMatch = () => {
    return credentials.email === demoAcc.email && credentials.password === demoAcc.password
  }
  loginMatch()
    ? dispatch(setLoginCredentials(credentials))
    : dispatch(setLoginAttemptStatus('INVALID'))
}
