import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth, getUserFirebaseProfile } from '../../firebase'
import { defaultUserFirebaseProfile } from '../../store/authentication/reducer'
import { FirebaseProfile } from '../../store/authentication/types'

import { StyledUserProfilePage } from './styles/UserProfilePage.styled'

const UserProfilePage = () => {
  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  // TODO show loading page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && userFirebaseProfile === defaultUserFirebaseProfile)
        setUserFirebaseProfile(getUserFirebaseProfile(user))
    })
  })
  return (
    <StyledUserProfilePage data-testid="user-profile-page">
      <h1>User Profile Page</h1>
      <div>Name: </div>
      <div>
        Email: {userFirebaseProfile.email}&nbsp;
        {userFirebaseProfile.emailVerified && '(Verified)'}
      </div>
      <div>
        <div>Photo:</div>
        <img src={''} alt="don't have" />
      </div>
    </StyledUserProfilePage>
  )
}

export default UserProfilePage
