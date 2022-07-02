import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'

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
  FirebaseProfile,
} from './types'
import { defaultUserData } from './reducer'

export const toggleTheme = () => (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
  const { themeMode } = getState().auth_reducer
  dispatch({
    type: AUTH_ACTIONS.SET_THEME,
    themeMode: themeMode === 'light' ? 'dark' : 'light',
  })
}

export const setIsLoggedIn = (isLoggedIn: boolean) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: AUTH_ACTIONS.SET_IS_LOGGED_IN,
    isLoggedIn: isLoggedIn,
  })
}

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
      chats: {},
      displayName: '',
      email: credentials.email,
      uid: user.uid,
    }

    await setRealtimeDatabase(initRealtimeData)
    // TODO abstract use editUserData
    const updateParticularsForm = httpsCallable(functions, 'updateParticularsForm')
    const result = (await updateParticularsForm(initUserData)) as any
    const success = result.data.success as boolean
    if (!success) {
      console.log(result)
      throw new Error("edit user data don't success")
    }
    console.log(result)
    // const userData: UserData = result.data.message
    dispatch({
      type: AUTH_ACTIONS.SET_USER_DATA,
      userData: initUserData,
    })
    dispatch(setSignupAttemptStatus('SUCCESS'))
  } catch (e) {
    console.error('The error is:\n', e as Error)
    dispatch(setSignupAttemptStatus(readSignupError(e)))
  } finally {
    dispatch(setIsLoading(false))
  }
}

// const setUserData = (userData: UserData) => (dispatch: Dispatch<ActionTypes>) => {
//   dispatch({
//     type: AUTH_ACTIONS.SET_USER_DATA,
//     userData: userData,
//   })
// }

export const getUserData = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true))
  try {
    const getUserInfo = httpsCallable(functions, 'getUserInfo')
    const result = (await getUserInfo()) as any
    const success = result.data.success as boolean
    if (!success) {
      console.log(result)
      throw new Error("get user data don't success")
    }
    console.log(result)
    const userData: UserData = result.data.message._doc
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

export const getAnotherUserInfo =
  (
    firebaseUID: string,
    setCustomStateHook: React.Dispatch<React.SetStateAction<UserData | null>>,
  ) =>
  async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setIsLoading(true))
    try {
      const getAnotherUserInfo = httpsCallable(functions, 'getAnotherUserInfo')
      const result = (await getAnotherUserInfo({ uid: firebaseUID })) as any
      const success = result.data.success as boolean
      if (!success) {
        console.log('owner data', result)
        throw new Error("get owner data don't success")
      }
      console.log('owner data', result)
      const info: UserData = result.data.message._doc
      setCustomStateHook(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const setUserFirebaseProfile =
  (userFirebaseProfile: FirebaseProfile) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: AUTH_ACTIONS.SET_USER_FIREBASE_PROFILE,
      userFirebaseProfile: userFirebaseProfile,
    })
  }

export const updateParticularsForm =
  (newUserData: UserData) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setIsLoading(true))
    try {
      const updateParticularsForm = httpsCallable(functions, 'updateParticularsForm')
      const result = (await updateParticularsForm(newUserData)) as any
      const success = result.data.success as boolean
      if (!success) {
        console.log(result)
        throw new Error("edit user data don't success")
      }
      console.log('lovely user data:\n', result)
      // const userData: UserData = result.data.message
      dispatch({
        type: AUTH_ACTIONS.SET_USER_DATA,
        userData: newUserData,
      })
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
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
