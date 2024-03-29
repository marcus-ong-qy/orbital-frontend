import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import blobToBase64 from '../../../common/blobToBase64'

import {
  setUpdateParticularsStatus,
  updateParticularsForm,
} from '../../../store/authentication/actions'
import { defaultUserData } from '../../../store/authentication/reducer'
import { UserData } from '../../../store/authentication/types'

import SettingsPageWrapper from '../SettingsPageWrapper'
import InputField from '../../../components/common/InputFields/InputField'
import Dropdown from '../../../components/common/Dropdown/Dropdown'
import PictureUploader from '../../../components/common/PictureUploader/PictureUploader'

import {
  ProfileForm,
  ItemPicture,
  PictureDiv,
  PostButton,
  EditUserProfileDiv,
  TitleDiv,
} from './styles/EditUserProfilePage.styled'
import { EntryArea, EntryDiv, EntryName } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'

const EditUserProfilePage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm({ mode: 'onChange' })

  const { userData, updateParticularsStatus } = useAppSelector((state) => state.auth_reducer)

  const { navTitleFont, p } = { ...theme.typography.fontSize }

  const [selectedImageBlob, setSelectedImageBlob] = useState<Blob>()
  const [selectedImageURL, setSelectedImageURL] = useState<string>(
    userData.imageURL ? userData.imageURL : defaultAvatar,
  )
  const [selectedImageB64, setSelectedImageB64] = useState<string>()
  const [formValues, setFormValues] = useState<UserData>(defaultUserData)

  useEffect(() => {
    if (updateParticularsStatus === 'SUCCESS') {
      navigate(PATHS.USER_PROFILE)
      dispatch(setUpdateParticularsStatus('INITIAL'))
    }
  }, [updateParticularsStatus])

  useEffect(() => {
    if (selectedImageBlob) {
      setSelectedImageURL(URL.createObjectURL(selectedImageBlob))
      blobToBase64(selectedImageBlob, setSelectedImageB64)
    }
  }, [selectedImageBlob])

  useEffect(() => {
    selectedImageB64 && setFormValues({ ...formValues, imageURL: selectedImageB64 })
  }, [selectedImageB64])

  useEffect(() => {
    userData && setFormValues(userData)
    console.log('form values set:\n', userData)
  }, [userData])

  useEffect(() => {
    console.log('form values:\n', formValues)
  }, [formValues])

  const onSubmit = () => {
    const newUserData: UserData = {
      name: formValues.name?.trim(),
      username: formValues.username?.trim(),
      phone: formValues.phone?.trim(),
      postal: formValues.postal?.trim(),
      address: formValues.address?.trim(),
      gender: formValues.gender,
      birthday: formValues.birthday,
      imageURL: formValues.imageURL,
      // firebaseUID: userFirebaseProfile.uid!,
    }
    dispatch(updateParticularsForm(newUserData))
  }

  return (
    <SettingsPageWrapper>
      <TitleDiv fontType={navTitleFont}>Edit My Profile</TitleDiv>
      <EditUserProfileDiv>
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
              required
            />
          </EntryDiv>

          <EntryDiv type="input">
            <EntryName fontType={p}>Gender&nbsp;</EntryName>
            <Dropdown
              title="Gender"
              placeholder="Gender"
              value={formValues.gender}
              onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
              options={['-', 'Male', 'Female', 'Others', 'Prefer Not to Say']}
              register={register}
              // onChange={(e) => {
              //   setListingType(e.target.value as TransactionType)
              // }}
            />
          </EntryDiv>

          {/* <EntryDiv type="input">
            <EntryName fontType={p}>Date of Birth&nbsp;</EntryName>
            <InputField
              title="DateOfBirth"
              placeholder="TODO make it dropdown"
              // value={formValues.dob} // TODO
              // onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
              register={register}
            />
          </EntryDiv> */}

          {/* <EntryDiv type="input">
            <EntryName fontType={p}>Email&nbsp;</EntryName>
            <InputField
              title="Email"
              placeholder="Email"
              // value={formValues.email} // TODO
              // onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              register={register}
            />
          </EntryDiv> */}

          <EntryDiv type="input">
            <EntryName fontType={p}>Phone no.&nbsp;</EntryName>
            <InputField
              title="PhoneNumber"
              type="number"
              placeholder="Phone Number"
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
              {...register('Address', { required: false })}
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
          <ItemPicture src={selectedImageURL} />
          <PictureUploader text="Select Display Pic" setSelectedImageBlob={setSelectedImageBlob} />
        </PictureDiv>
      </EditUserProfileDiv>
    </SettingsPageWrapper>
  )
}

export default EditUserProfilePage
