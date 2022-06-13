import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  EntryDiv,
  PostForm,
  ItemPicture,
  LeftDiv,
  PictureButton,
  PostButton,
  RightDiv,
  StyledUploadListingPage,
  UploadListingDiv,
  TitleHighlight,
  TitleDiv,
  EntryName,
  EntryArea,
  TypeSelection,
} from './styles/UploadListingPage.styled'

import defaultPic from '../../../assets/picture.png'
import { FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'
import { theme } from '../../../styles/Theme'
import InputField from '../../../components/common/InputFields/InputField'
import { ItemListingPost } from '../../../store/marketplace/types'
import { setNewListing } from '../../../store/marketplace/actions'

const UploadListingPage = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const { newListing } = useAppSelector((state) => state.marketplace_reducer)
  const { name, price, description, typeOfTransaction, deliveryInformation, tags, imageURL } = {
    ...newListing,
  }
  const { navTitleFont, p } = { ...theme.typography.fontSize }

  const [listingType, setListingType] = useState<'Rent' | 'Sell'>(typeOfTransaction)

  const uploadPicture = () => {}

  const onSubmit = (data: FieldValues) => {
    const newListing: ItemListingPost = {
      createdBy: '',
      name: data.ItemName,
      price: data.Price,
      description: data.ProductDescription,
      typeOfTransaction: listingType,
      deliveryInformation: data.DealInformation,
      tags: data.Tags.split(','),
      imageURL: '',
    }
    dispatch(setNewListing(newListing))
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
          <ItemPicture src={defaultPic} />
          <PictureButton text="Upload Picture" onClick={uploadPicture} />
        </LeftDiv>
        <RightDiv>
          <PostForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <EntryDiv type="input">
              <EntryName fontType={p}> Listing Type&nbsp;</EntryName>
              <TypeSelection
                placeholder="Listing Type"
                value={listingType}
                {...register('ListingType', { required: true })}
                onChange={(e) => {
                  setValue('ListingType', e.target.value)
                  setListingType(e.target.value as 'Rent' | 'Sell')
                }}
              >
                <option value="Rent">Rent</option>
                <option value="Sell">Sell</option>
              </TypeSelection>
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
            <EntryDiv type="input">
              <EntryName fontType={p}>Tags </EntryName>
              <InputField
                title="Tags"
                placeholder="Seperate keywords with commas (,)"
                register={register}
              />
            </EntryDiv>
            <PostButton type="submit" text="Post" />
          </PostForm>
        </RightDiv>
      </UploadListingDiv>
    </StyledUploadListingPage>
  )
}

export default UploadListingPage
