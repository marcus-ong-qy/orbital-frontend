import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { PATHS } from '../../../routes/PATHS'
import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import unixToFullDate from '../../../common/unixToFullDate'

import { getUserData } from '../../../store/authentication/actions'
import { defaultUserData, defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile, UserData } from '../../../store/authentication/types'

import SettingsPageWrapper from '../SettingsPageWrapper'

import {
  EditButton,
  EntryDiv,
  EntryName,
  EntryValue,
  ItemPicture,
  PictureButton,
  PictureDiv,
  ProfileDiv,
  TitleDiv,
  UserProfileDiv,
} from './styles/UserProfilePage.styled'

import defaultPic from '../../../assets/picture.png'

const UserProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.auth_reducer)

  const { navTitleFont, p } = { ...theme.typography.fontSize }

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
  }, [dispatch, isLoggedIn])

  const uploadPicture = () => {}

  return (
    <SettingsPageWrapper data-testid="user-profile-page">
      <UserProfileDiv>
        <ProfileDiv>
          <TitleDiv fontType={navTitleFont}>My Profile</TitleDiv>
          <EntryDiv>
            <EntryName fontType={p}>Username</EntryName>
            <EntryValue fontType={p}> {userDataHook.username}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Name</EntryName>
            <EntryValue fontType={p}> {userDataHook.name}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Gender</EntryName>
            <EntryValue fontType={p}> {userDataHook.gender}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Date of Birth</EntryName>
            <EntryValue fontType={p}>{unixToFullDate(userDataHook.dob)}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Email</EntryName>
            <EntryValue fontType={p}> {userFirebaseProfile.email}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Phone</EntryName>
            <EntryValue fontType={p}> {userDataHook.phone}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Address</EntryName>
            <EntryValue fontType={p}> {userDataHook.address}</EntryValue>
          </EntryDiv>
          <EntryDiv>
            <EntryName fontType={p}>Postal</EntryName>
            <EntryValue fontType={p}> {userDataHook.postal}</EntryValue>
          </EntryDiv>
          <EditButton text="📝 Edit Info" onClick={() => navigate(PATHS.EDIT_USER_PROFILE)} />
        </ProfileDiv>
        <PictureDiv>
          <ItemPicture src={defaultPic} />
          <PictureButton text="Select Display Pic" onClick={uploadPicture} />
        </PictureDiv>
      </UserProfileDiv>
    </SettingsPageWrapper>
  )
}

export default UserProfilePage
