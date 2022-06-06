import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { PATHS } from '../../routes/PATHS'
import { auth, getUserFirebaseProfile } from '../../firebase'
import { logout } from '../../store/authentication/actions'
import { defaultUserFirebaseProfile } from '../../store/authentication/reducer'
import { FirebaseProfile } from '../../store/authentication/types'

const MainPage = () => {
  const navigate = useNavigate()

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserFirebaseProfile(getUserFirebaseProfile(user))
        setIsLoggedIn(true)
      } else if (!user && isLoggedIn) {
        setUserFirebaseProfile(defaultUserFirebaseProfile)
        setIsLoggedIn(false)
      }
    })
  })

  const loginOnClick = () => {
    navigate(PATHS.LOGIN)
  }

  const signOutOnClick = () => {
    logout()
    navigate(PATHS.LOGIN)
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      data-testid="MarketplaceMain"
    >
      <h1>Main Page</h1>
      {isLoggedIn ? (
        <>
          <h2>User logged in!</h2>
          <h2>
            Email: {userFirebaseProfile.email}&nbsp;
            {userFirebaseProfile.emailVerified && '(Verified)'}
          </h2>
          <br />
          <button onClick={signOutOnClick}>Sign Out</button>
        </>
      ) : (
        <>
          <h2>User not logged in</h2>
          <br />
          <button onClick={loginOnClick}>Go To Login Page</button>
        </>
      )}
    </div>
  )
}

export default MainPage
