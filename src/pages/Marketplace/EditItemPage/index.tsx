import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import blobToBase64 from '../../../common/blobToBase64'

import {
  deleteItem,
  getItemById,
  setUploadStatus,
  updateItem,
} from '../../../store/marketplace/actions'
import { ItemListing, ItemListingPut, TransactionType } from '../../../store/marketplace/types'

import InputField from '../../../components/common/InputFields/InputField'
import Dropdown from '../../../components/common/Dropdown/Dropdown'
import PictureUploader from '../../../components/common/PictureUploader/PictureUploader'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'
import Button from '../../../components/common/Button/Button'

import {
  PostForm,
  ItemPicture,
  LeftDiv,
  PostButton,
  RightDiv,
  StyledEditItemPage,
  UploadListingDiv,
  TitleDiv,
  ItemName,
} from './styles/EditItemPage.styled'
import { EntryDiv, EntryName, EntryArea } from '../../../styles/index.styled'

import defaultPic from '../../../assets/picture.png'

const EditItemPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams<{ itemId: string }>()

  const { navTitleFont, p } = { ...theme.typography.fontSize }
  const { register, handleSubmit } = useForm({ mode: 'onChange' })

  const { isLoading, userFirebaseProfile } = useAppSelector((state) => state.auth_reducer)
  const { uploadStatus, selectedItemData } = useAppSelector((state) => state.marketplace_reducer)

  const [selectedImageBlob, setSelectedImageBlob] = useState<Blob>()
  const [selectedImageURL, setSelectedImageURL] = useState<string>(defaultPic)
  const [selectedImageB64, setSelectedImageB64] = useState<string>()
  const [formValues, setFormValues] = useState<ItemListing>(selectedItemData)

  const allowedToEdit = userFirebaseProfile.uid === formValues?.createdBy

  useEffect(() => {
    if (uploadStatus === 'SUCCESS') navigate(`${PATHS.ITEM}/${params.itemId}`)
    else if (uploadStatus === 'DELETED') navigate(PATHS.USER_LISTINGS)
    dispatch(setUploadStatus('INITIAL'))
  }, [uploadStatus])

  useEffect(() => {
    if (selectedImageBlob) {
      setSelectedImageURL(URL.createObjectURL(selectedImageBlob))
      blobToBase64(selectedImageBlob, setSelectedImageB64)
    }
  }, [selectedImageBlob])

  useEffect(() => {
    selectedImageB64 && setFormValues({ ...formValues, imageURL: [selectedImageB64] })
  }, [selectedImageB64])

  useEffect(() => {
    params.itemId && dispatch(getItemById(params.itemId))
  }, [params.itemId])

  const onSubmit = () => {
    const editedListing: ItemListingPut = {
      item_id: params.itemId ?? '',
      name: formValues?.name?.trim() ?? '',
      price: formValues?.price ?? 0,
      description: formValues?.description?.trim() ?? '',
      typeOfTransaction: formValues?.typeOfTransaction ?? 'RENT',
      deliveryInformation: formValues?.deliveryInformation?.trim() ?? '',
      // tags: data.Tags.split(',').map((tag: string) => tag.trim()),
      tags: undefined, // TODO
      imageURL: formValues?.imageURL ? formValues?.imageURL : [],
    }
    dispatch(updateItem(editedListing))
    console.table(editedListing)
  }

  const onDelete = () => {
    params.itemId && dispatch(deleteItem(params.itemId))
  }

  return (
    <StyledEditItemPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <>
          {allowedToEdit ? (
            <>
              <TitleDiv fontType={navTitleFont}>Edit Item</TitleDiv>
              <UploadListingDiv>
                <LeftDiv>
                  <ItemPicture
                    src={formValues?.imageURL[0] ? formValues.imageURL[0] : selectedImageURL}
                  />
                  <PictureUploader
                    text="Upload Picture"
                    setSelectedImageBlob={setSelectedImageBlob}
                  />
                </LeftDiv>
                <RightDiv>
                  <PostForm onSubmit={handleSubmit(onSubmit)} noValidate>
                    <EntryDiv type="input">
                      <EntryName fontType={p}> Item Name&nbsp;</EntryName>
                      <ItemName fontType={p}>{formValues.name}</ItemName>
                    </EntryDiv>
                    <EntryDiv type="input">
                      <EntryName fontType={p}> Listing Type&nbsp;</EntryName>
                      <Dropdown
                        title="ListingType"
                        placeholder="Listing Type"
                        options={[
                          { name: 'Rent', value: 'RENT' },
                          { name: 'Sell', value: 'SELL' },
                        ]}
                        register={register}
                        value={formValues?.typeOfTransaction}
                        onChange={(e) =>
                          formValues &&
                          setFormValues({
                            ...formValues,
                            typeOfTransaction: e.target.value as TransactionType,
                          })
                        }
                      />
                    </EntryDiv>
                    <EntryDiv type="input">
                      <EntryName fontType={p}>
                        Price <b>SG$</b> {formValues?.typeOfTransaction === 'RENT' && '/day'}
                      </EntryName>
                      <InputField
                        title="Price"
                        type="number"
                        placeholder="Enter Price (in SGD)"
                        pattern={/^\d*\.?\d{0,2}$/}
                        register={register}
                        value={formValues?.price}
                        onChange={(e) =>
                          formValues &&
                          setFormValues({ ...formValues, price: Number(e.target.value) })
                        }
                        required
                      />
                    </EntryDiv>
                    <EntryDiv type="textarea">
                      <EntryName fontType={p}>Product Description&nbsp;</EntryName>
                      <EntryArea
                        title="ProductDescription"
                        placeholder="Description of your Product"
                        {...register('ProductDescription', { required: true })}
                        value={formValues?.description}
                        onChange={(e) =>
                          formValues &&
                          setFormValues({ ...formValues, description: e.target.value })
                        }
                      />
                    </EntryDiv>
                    <EntryDiv type="textarea">
                      <EntryName fontType={p}>Deal Information&nbsp;</EntryName>
                      <EntryArea
                        title="DealInformation"
                        placeholder="Include details such as Delivery and Payment methods"
                        {...register('DealInformation', { required: true })}
                        value={formValues?.deliveryInformation}
                        onChange={(e) =>
                          formValues &&
                          setFormValues({ ...formValues, deliveryInformation: e.target.value })
                        }
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
                    <PostButton type="submit" text="Edit" />
                    <Button
                      text="DELETE Item"
                      onClick={onDelete}
                      style={{ marginTop: '20px' }}
                      color="danger"
                    />
                  </PostForm>
                </RightDiv>
              </UploadListingDiv>
            </>
          ) : (
            <h1>Forbidden</h1>
          )}
        </>
      )}
    </StyledEditItemPage>
  )
}

export default EditItemPage
