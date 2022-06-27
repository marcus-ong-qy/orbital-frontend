import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { PATHS } from '../../../routes/PATHS'
import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import blobToBase64 from '../../../common/blobToBase64'

import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'

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

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [selectedImageURL, setSelectedImageURL] = useState<string>(
    userData.imageURL ? userData.imageURL : defaultPic,
  )

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
  }, [dispatch, isLoggedIn])

  return (
    <SettingsPageWrapper data-testid="user-profile-page">
      <UserProfileDiv>
        <ProfileDiv>
          <TitleDiv fontType={navTitleFont}>My Profile</TitleDiv>
          <Entry name="Username" value={userData.username} />
          <Entry name="Name" value={userData.name} />
          <Entry name="Gender" value={userData.gender} />
          {/* <Entry name="Date of Birth" value={unixToFullDate(userData.dob)} /> */}
          <Entry name="Email" value={userFirebaseProfile.email!} />
          <Entry name="Phone" value={userData.phone} />
          <Entry name="Address" value={userData.address} />
          <Entry name="Postal" value={userData.postal} />
          <EditButton text="📝 Edit Info" onClick={() => navigate(PATHS.EDIT_USER_PROFILE)} />
        </ProfileDiv>
        <PictureDiv>
          <ItemPicture src={selectedImageURL} />
        </PictureDiv>
      </UserProfileDiv>
    </SettingsPageWrapper>
  )
}

export default UserProfilePage
