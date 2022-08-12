import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import axios from 'axios'

import { auth, setRealtimeDatabase } from '../../firebase'
import { demoAcc } from '../../demo-config'
import { BASE_URL, ENDPOINTS, TIMEOUT } from '../api'
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
  UpdateParticularsStatus,
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

    const initRealtimeData: RealtimeUserData = {
      chats: {},
      displayName: '',
      email: credentials.email,
      uid: user.uid,
    }

    await setRealtimeDatabase(initRealtimeData)

    const setUserData = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: { uid: user.uid },
    })
    const response = await setUserData.put(ENDPOINTS.USER, { name: credentials.email })
    const userData: UserData = response.data.message
    console.log(response.status)
    if (response.status === 201) {
      console.log('yes')
      dispatch({
        type: AUTH_ACTIONS.SET_USER_DATA,
        userData: userData,
      })
      dispatch(setSignupAttemptStatus('SUCCESS'))
    }
  } catch (e) {
    console.error('The error is:\n', e as Error)
    dispatch(setSignupAttemptStatus(readSignupError(e)))
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

export const getUserData = () => async (dispatch: Dispatch<ActionTypes>) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setIsLoading(true))
      const userUID = user.uid
      try {
        const getUserData = axios.create({
          baseURL: BASE_URL,
          timeout: TIMEOUT,
        })
        const response = await getUserData.get(`${ENDPOINTS.USER}?uid=${userUID}`)
        const userData: UserData = response.data.message
        response.status === 200 && dispatch(setUserData(userData))
      } catch (e) {
        console.error('The error is:\n', e as Error)
      } finally {
        dispatch(setIsLoading(false))
      }
    } else {
      // alert('not logged in!')
    }
  })
}

export const getAnotherUserInfo =
  (
    firebaseUID: string,
    setCustomStateHook: React.Dispatch<React.SetStateAction<UserData | null>>,
    noLoading?: boolean,
  ) =>
  async (dispatch: Dispatch<ActionTypes>) => {
    !noLoading && dispatch(setIsLoading(true))
    try {
      const getUserData = axios.create({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
      })
      const response = await getUserData.get(`${ENDPOINTS.USER}?uid=${firebaseUID}`)
      const userData: UserData = response.data.message
      response.status === 200 && setCustomStateHook(userData)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      !noLoading && dispatch(setIsLoading(false))
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setIsLoading(true))
        const userUID = user.uid
        try {
          const updateUserData = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
            headers: { uid: userUID },
          })
          const response = await updateUserData.put(ENDPOINTS.USER, newUserData)
          const userData: UserData = response.data.message
          response.status === 201 &&
            dispatch({
              type: AUTH_ACTIONS.EDIT_PROFILE,
              userData: userData,
              updateParticularsStatus: 'SUCCESS',
            })
        } catch (e) {
          console.error('The error is:\n', e as Error)
        } finally {
          dispatch(setIsLoading(false))
        }
      } else {
        // alert('not logged in!')
      }
    })
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

export const setUpdateParticularsStatus =
  (status: UpdateParticularsStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_PARTICULARS_STATUS,
      updateParticularsStatus: status,
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
