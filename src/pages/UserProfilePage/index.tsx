import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth, getUserProfile } from '../../firebase'
import { defaultUserProfile } from '../../store/reducer'
import { ProfileInfo } from '../../store/types'

import { StyledUserProfilePage } from './styles/UserProfilePage.styled'

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState<ProfileInfo>(defaultUserProfile)

  // TODO show loading page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && userProfile === defaultUserProfile) setUserProfile(getUserProfile(user))
    })
  })
  return (
    <StyledUserProfilePage>
      <h1>User Profile Page</h1>
      <div>Name: {userProfile.displayName}</div>
      <div>
        Email: {userProfile.email}&nbsp;
        {userProfile.emailVerified && '(Verified)'}
      </div>
      <div>
        <div>Photo:</div>
        <img src={userProfile.photoURL!} alt="don't have" />
      </div>
    </StyledUserProfilePage>
  )
}

export default UserProfilePage
