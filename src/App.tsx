import { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { ToastContainer } from 'react-toastify'

import { auth, getUserFirebaseProfile } from './firebase'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { Routes } from './routes/Routes'
import Theme from './styles/Theme'
import { GlobalStyle } from './styles/GlobalStyles'

import { setUserFirebaseProfile, setIsLoggedIn } from './store/authentication/actions'
import { defaultUserFirebaseProfile } from './store/authentication/reducer'

import LoadingPage from './pages/Miscellaneous/LoadingPage'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useAppDispatch()
  const { isLoggedIn, themeMode } = useAppSelector((state) => state.auth_reducer)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        dispatch(setUserFirebaseProfile(getUserFirebaseProfile(user)))
        dispatch(setIsLoggedIn(true))
      } else if (!user && isLoggedIn) {
        dispatch(setUserFirebaseProfile(defaultUserFirebaseProfile))
        dispatch(setIsLoggedIn(false))
      }
    })
  })

  return (
    <BrowserRouter>
      <Theme>
        <GlobalStyle />
        <Suspense fallback={<LoadingPage />}>
          <ToastContainer
            theme={themeMode}
            autoClose={3000}
            position="bottom-right"
            closeOnClick
            pauseOnHover
          />
          <Routes />
        </Suspense>
      </Theme>
    </BrowserRouter>
  )
}

export default App
