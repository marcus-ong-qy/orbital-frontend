import { FieldValues, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { theme } from '../../../styles/Theme'

import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'
import { postNewListing, setNewListing } from '../../../store/marketplace/actions'
import { ItemListingPost } from '../../../store/marketplace/types'

import InputField from '../../../components/common/InputFields/InputField'
import Dropdown from '../../../components/common/Dropdown/Dropdown'

import {
  PostForm,
  ItemPicture,
  LeftDiv,
  PostButton,
  RightDiv,
  StyledUploadListingPage,
  UploadListingDiv,
  TitleHighlight,
  TitleDiv,
} from './styles/UploadListingPage.styled'
import { EntryDiv, EntryName, EntryArea } from '../../../styles/index.styled'

import defaultPic from '../../../assets/picture.png'
import PictureUploader from '../../../components/common/PictureUploader/PictureUploader'

const UploadListingPage = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm({ mode: 'onChange' })

  const { newListing } = useAppSelector((state) => state.marketplace_reducer)
  const { typeOfTransaction } = { ...newListing }
  const { navTitleFont, p } = { ...theme.typography.fontSize }

  const [listingType, setListingType] = useState<'Rent' | 'Sell'>(typeOfTransaction)

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string>(defaultPic)

  useEffect(() => {
    console.log('this is an image string:', selectedImage)
  }, [selectedImage])

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

  const uploadPicture = () => {}

  const onSubmit = (data: FieldValues) => {
    const newListing: ItemListingPost = {
      firebaseUID: userFirebaseProfile.uid ?? '',
      name: data.ItemName.trim(),
      price: data.Price,
      description: data.ProductDescription.trim(),
      typeOfTransaction: listingType,
      deliveryInformation: data.DealInformation.trim(),
      // tags: data.Tags.split(',').map((tag: string) => tag.trim()),
      tags: [],
      imageURL: '',
    }
    dispatch(postNewListing(newListing))
    console.table(newListing)
  }

  return (
    <StyledUploadListingPage>
      <TitleDiv fontType={navTitleFont}>
        What are you <TitleHighlight type={listingType}>{`${listingType}ing `}</TitleHighlight>
        today?
      </TitleDiv>
      <UploadListingDiv>
        <LeftDiv>
          <ItemPicture src={selectedImage} />
          <PictureUploader text="Upload Picture" setSelectedImage={setSelectedImage} />
        </LeftDiv>
        <RightDiv>
          <PostForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <EntryDiv type="input">
              <EntryName fontType={p}> Listing Type&nbsp;</EntryName>
              <Dropdown
                title="ListingType"
                placeholder="Listing Type"
                options={['Rent', 'Sell']}
                register={register}
                value={listingType}
                onChange={(e) => setListingType(e.target.value as 'Rent' | 'Sell')}
              />
            </EntryDiv>
            <EntryDiv type="input">
              <EntryName fontType={p}>Item Name&nbsp;</EntryName>
              <InputField title="ItemName" placeholder="Item Name" register={register} />
            </EntryDiv>
            <EntryDiv type="input">
              <EntryName fontType={p}>
                Price <b>SG$</b> {listingType === 'Rent' && '/day'}
              </EntryName>
              <InputField
                title="Price"
                type="number"
                placeholder="Enter Price (in SGD)"
                pattern={/^\d*\.?\d{0,2}$/}
                register={register}
              />
            </EntryDiv>
            <EntryDiv type="textarea">
              <EntryName fontType={p}>Product Description&nbsp;</EntryName>
              <EntryArea
                title="ProductDescription"
                placeholder="Description of your Product"
                {...register('ProductDescription', { required: true })}
              />
            </EntryDiv>
            <EntryDiv type="textarea">
              <EntryName fontType={p}>Deal Information&nbsp;</EntryName>
              <EntryArea
                title="DealInformation"
                placeholder="Include details such as Delivery and Payment methods"
                {...register('DealInformation', { required: true })}
              />
            </EntryDiv>
            {/* <EntryDiv type="input">
              <EntryName fontType={p}>Tags </EntryName>
              <InputField
                title="Tags"
                placeholder="Seperate keywords with commas (,)"
                register={register}
              />
            </EntryDiv> */}
            <PostButton type="submit" text="Post" />
          </PostForm>
        </RightDiv>
      </UploadListingDiv>
    </StyledUploadListingPage>
  )
}

export default UploadListingPage
