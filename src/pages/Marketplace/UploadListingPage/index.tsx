import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import blobToBase64 from '../../../common/blobToBase64'

import { uploadListing, setUploadStatus } from '../../../store/marketplace/actions'
import { ItemListingPost } from '../../../store/marketplace/types'

import InputField from '../../../components/common/InputFields/InputField'
import Dropdown from '../../../components/common/Dropdown/Dropdown'
import PictureUploader from '../../../components/common/PictureUploader/PictureUploader'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

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

const UploadListingPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({ mode: 'onChange' })

  const { isLoading } = useAppSelector((state) => state.auth_reducer)
  const { newListing, uploadStatus } = useAppSelector((state) => state.marketplace_reducer)
  const { typeOfTransaction } = { ...newListing }
  const { navTitleFont, p } = { ...theme.typography.fontSize }

  const [listingType, setListingType] = useState<'Rent' | 'Sell'>(typeOfTransaction)

  const [selectedImageBlob, setSelectedImageBlob] = useState<Blob>()
  const [selectedImageURL, setSelectedImageURL] = useState<string>(defaultPic)
  const [selectedImageB64, setSelectedImageB64] = useState<string>()

  useEffect(() => {
    if (uploadStatus === 'SUCCESS') {
      navigate(`${PATHS.USER_LISTINGS}`) // TODO make it redirect to the listing itself
      dispatch(setUploadStatus('INITIAL'))
    }
  })

  useEffect(() => {
    if (selectedImageBlob) {
      setSelectedImageURL(URL.createObjectURL(selectedImageBlob))
      blobToBase64(selectedImageBlob, setSelectedImageB64)
    }
  }, [selectedImageBlob])

  const onSubmit = (data: FieldValues) => {
    const newListing: ItemListingPost = {
      name: data.ItemName.trim(),
      price: data.Price,
      description: data.ProductDescription.trim(),
      typeOfTransaction: listingType,
      deliveryInformation: data.DealInformation.trim(),
      // tags: data.Tags.split(',').map((tag: string) => tag.trim()),
      tags: undefined, // TODO
      imageURL: selectedImageB64,
    }
    dispatch(uploadListing(newListing))
    console.table(newListing)
  }

  return (
    <StyledUploadListingPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <>
          <TitleDiv fontType={navTitleFont}>
            What are you <TitleHighlight type={listingType}>{`${listingType}ing `}</TitleHighlight>
            today?
          </TitleDiv>
          <UploadListingDiv>
            <LeftDiv>
              <ItemPicture src={selectedImageURL} />
              <PictureUploader text="Upload Picture" setSelectedImageBlob={setSelectedImageBlob} />
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
        </>
      )}
    </StyledUploadListingPage>
  )
}

export default UploadListingPage
