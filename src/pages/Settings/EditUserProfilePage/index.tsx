import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { onAuthStateChanged } from 'firebase/auth'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { theme } from '../../../styles/Theme'

import { editUserData, getUserData } from '../../../store/authentication/actions'
import { defaultUserData, defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile, UserData } from '../../../store/authentication/types'

import SettingsPageWrapper from '../SettingsPageWrapper'
import InputField from '../../../components/common/InputFields/InputField'
import Dropdown from '../../../components/common/Dropdown/Dropdown'

import {
  EntryDiv,
  ProfileForm,
  ItemPicture,
  PictureDiv,
  PictureButton,
  PostButton,
  UploadListingDiv,
  TitleDiv,
  EntryName,
  EntryArea,
} from './styles/EditUserProfilePage.styled'

import defaultPic from '../../../assets/picture.png'

const EditUserProfilePage = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const { userData } = useAppSelector((state) => state.auth_reducer)

  const { navTitleFont, p } = { ...theme.typography.fontSize }

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  const [formValues, setFormValues] = useState<UserData>(defaultUserData)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    userData && setFormValues(userData)
    console.table(userData)
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

  const uploadPicture = () => {}

  const onSubmit = (data: FieldValues) => {
    const newUserData: UserData = {
      name: data.Name,
      username: data.Username,
      phone: data.PhoneNumber,
      postal: data.PostalCode,
      address: data.Address,
      gender: data.Gender,
      dob: data.DateOfBirth,
      firebaseUID: userFirebaseProfile.uid!,
    }
    dispatch(editUserData(newUserData))
    console.table(newUserData)
  }

  return (
    <SettingsPageWrapper>
      <TitleDiv fontType={navTitleFont}>Edit My Profile</TitleDiv>
      <UploadListingDiv>
        <ProfileForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <EntryDiv type="input">
            <EntryName fontType={p}>Username&nbsp;</EntryName>
            <InputField
              title="Username"
              placeholder="Username"
              value={formValues.username}
              onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
              register={register}
            />
          </EntryDiv>
          <EntryDiv type="input">
            <EntryName fontType={p}>Name&nbsp;</EntryName>
            <InputField
              title="Name"
              placeholder="Name"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              register={register}
            />
          </EntryDiv>

          <EntryDiv type="input">
            <EntryName fontType={p}> Gender&nbsp;</EntryName>
            <Dropdown
              title="Gender"
              placeholder="Gender"
              value={formValues.gender}
              onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
              options={['Male', 'Female', 'Others', 'Prefer Not to Say']}
              register={register}
              // onChange={(e) => {
              //   setListingType(e.target.value as 'Rent' | 'Sell')
              // }}
            />
          </EntryDiv>

          <EntryDiv type="input">
            <EntryName fontType={p}>Date of Birth&nbsp;</EntryName>
            <InputField
              title="DateOfBirth"
              placeholder="TODO make it dropdown"
              // value={formValues.dob} // TODO
              // onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
              register={register}
            />
          </EntryDiv>

          <EntryDiv type="input">
            <EntryName fontType={p}>Email&nbsp;</EntryName>
            <InputField
              title="Email"
              placeholder="TODO put a verify/ied button"
              // value={formValues.email} // TODO
              // onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              register={register}
            />
          </EntryDiv>

          <EntryDiv type="input">
            <EntryName fontType={p}>Phone no.&nbsp;</EntryName>
            <InputField
              title="PhoneNumber"
              type="number"
              placeholder="TODO format it"
              value={formValues.phone}
              onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
              register={register}
            />
          </EntryDiv>

          <EntryDiv type="textarea">
            <EntryName fontType={p}>Address&nbsp;</EntryName>
            <EntryArea
              title="Address"
              placeholder="Address"
              {...register('Address', { required: true })}
              value={formValues.address}
              onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
            />
          </EntryDiv>

          <EntryDiv type="input">
            <EntryName fontType={p}>Postal Code&nbsp;</EntryName>
            <InputField
              title="PostalCode"
              placeholder="Postal Code"
              value={formValues.postal}
              onChange={(e) => setFormValues({ ...formValues, postal: e.target.value })}
              register={register}
            />
          </EntryDiv>

          <PostButton type="submit" text="📝 Save Changes" />
        </ProfileForm>

        <PictureDiv>
          <ItemPicture src={defaultPic} />
          <PictureButton text="Upload Picture" onClick={uploadPicture} />
        </PictureDiv>
      </UploadListingDiv>
    </SettingsPageWrapper>
  )
}

export default EditUserProfilePage