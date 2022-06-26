import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { PATHS } from '../../../routes/PATHS'
import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import unixToFullDate from '../../../common/unixToFullDate'
import blobToBase64 from '../../../common/blobToBase64'

import { getUserData } from '../../../store/authentication/actions'
import { defaultUserData, defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile, UserData } from '../../../store/authentication/types'

import PictureUploader from '../../../components/common/PictureUploader/PictureUploader'
import SettingsPageWrapper from '../SettingsPageWrapper'

import {
  EditButton,
  EntryDiv,
  EntryName,
  EntryValue,
  ItemPicture,
  PictureDiv,
  ProfileDiv,
  TitleDiv,
  UserProfileDiv,
} from './styles/UserProfilePage.styled'

import defaultPic from '../../../assets/picture.png'

const Entry = ({ name, value }: { name: string; value: string }) => {
  const { p } = { ...theme.typography.fontSize }

  return (
    <EntryDiv>
      <EntryName fontType={p}>{name}</EntryName>
      <EntryValue fontType={p}>&nbsp;{value}</EntryValue>
    </EntryDiv>
  )
}

const UserProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.auth_reducer)

  const { navTitleFont } = { ...theme.typography.fontSize }

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [userDataHook, setUserDataHook] = useState<UserData>(defaultUserData)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [selectedImageBlob, setSelectedImageBlob] = useState<Blob>()
  const [selectedImageURL, setSelectedImageURL] = useState<string>(defaultPic)
  const [selectedImageB64, setSelectedImageB64] = useState<string>('')

  useEffect(() => {
    if (selectedImageBlob) {
      setSelectedImageURL(URL.createObjectURL(selectedImageBlob))
      blobToBase64(selectedImageBlob, setSelectedImageB64)
    }
  }, [selectedImageBlob])

  useEffect(() => {
    userData && setUserDataHook(userData)
  }, [userData])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserFirebaseProfile(getUserFirebaseProfile(user))
        setIsLoggedIn(true)
        dispatch(getUserData())
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
          <Entry name="Username" value={userDataHook.username} />
          <Entry name="Name" value={userDataHook.name} />
          <Entry name="Gender" value={userDataHook.gender} />
          {/* <Entry name="Date of Birth" value={unixToFullDate(userDataHook.dob)} /> */}
          <Entry name="Email" value={userFirebaseProfile.email!} />
          <Entry name="Phone" value={userDataHook.phone} />
          <Entry name="Address" value={userDataHook.address} />
          <Entry name="Postal" value={userDataHook.postal} />
          <EditButton text="📝 Edit Info" onClick={() => navigate(PATHS.EDIT_USER_PROFILE)} />
        </ProfileDiv>
        <PictureDiv>
          <ItemPicture src={selectedImageURL} />
          <PictureUploader text="Select Display Pic" setSelectedImageBlob={setSelectedImageBlob} />
        </PictureDiv>
      </UserProfileDiv>
    </SettingsPageWrapper>
  )
}

export default UserProfilePage
