import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

// import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { getUserData } from '../../../store/authentication/actions'
import { defaultUserData, defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile, UserData } from '../../../store/authentication/types'

import SettingsPageWrapper from '../SettingsPageWrapper'

const UserProfilePage = () => {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.auth_reducer)

  // const { navTitleFont, p } = { ...theme.typography.fontSize }

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  const [userDataHook, setUserDataHook] = useState<UserData>(defaultUserData)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    userData && setUserDataHook(userData)
  }, [userData])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserFirebaseProfile(getUserFirebaseProfile(user))
        setIsLoggedIn(true)
        dispatch(getUserData(user))
      } else if (!user && isLoggedIn) {
        setUserFirebaseProfile(defaultUserFirebaseProfile)
        setIsLoggedIn(false)
      }
    })
  })

  return (
    <SettingsPageWrapper data-testid="user-profile-page">
      <h1>My Profile</h1>
      <div>Name: {userDataHook.name}</div>
      <div>Username: {userDataHook.username}</div>
      <div>Phone: {userDataHook.phone}</div>
      <div>Postal: {userDataHook.postal}</div>
      <div>Email: {userFirebaseProfile.email}</div>
      <div>Address: {userDataHook.address}</div>
      <div>Gender: {userDataHook.gender}</div>
      <div>DOB: {userDataHook.dob}</div>
    </SettingsPageWrapper>
  )
}

export default UserProfilePage
