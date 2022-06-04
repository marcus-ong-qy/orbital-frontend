import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { PATHS } from '../../routes/PATHS'
import { auth, getUserProfile } from '../../firebase'
import { logout } from '../../store/actions'
import { defaultUserProfile } from '../../store/reducer'
import { ProfileInfo } from '../../store/types'

const MainPage = () => {
  const navigate = useNavigate()

  const [userProfile, setUserProfile] = useState<ProfileInfo>(defaultUserProfile)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // TODO show loading page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserProfile(getUserProfile(user))
        setIsLoggedIn(true)
      } else if (!user) {
        setUserProfile(defaultUserProfile)
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
            Email: {userProfile.email}&nbsp;
            {userProfile.emailVerified && '(Verified)'}
          </h2>
          <br />
          <button onClick={signOutOnClick}>Sign Out</button>
        </>
      ) : (
        <>
          <h2>User not logged in</h2>
          <br />
          <button onClick={loginOnClick}>Log In</button>
        </>
      )}
    </div>
  )
}

export default MainPage
