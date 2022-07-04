import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import blobToBase64 from '../../../common/blobToBase64'

import { getItemById, setUploadStatus, updateItem } from '../../../store/marketplace/actions'
import { ItemListing, ItemListingPost } from '../../../store/marketplace/types'

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
  const [formInfo, setFormInfo] = useState<ItemListing>(selectedItemData)

  const allowedToEdit = userFirebaseProfile.uid === formInfo?.createdBy

  useEffect(() => {
    if (uploadStatus === 'SUCCESS') {
      navigate(`${PATHS.ITEM}/${params.itemId}`)
      dispatch(setUploadStatus('INITIAL'))
    }
  })

  useEffect(() => {
    if (selectedImageBlob) {
      setSelectedImageURL(URL.createObjectURL(selectedImageBlob))
      blobToBase64(selectedImageBlob, setSelectedImageB64)
    }
  }, [selectedImageBlob])

  // const getItemInfo = async (itemId: string) => {
  //   dispatch(setIsLoading(true))
  //   try {
  //     const getItemById = httpsCallable(functions, 'getItemById')
  //     const result = (await getItemById({ id: itemId })) as any
  //     const success = result.data.sucess as boolean
  //     if (!success) {
  //       console.log(result)
  //       throw new Error("get item info don't success")
  //     }
  //     console.log(result)
  //     const info: ItemListing = result.data.message._doc
  //     setItemInfo(info)
  //   } catch (e) {
  //     console.error('The error is:\n', e as Error)
  //   } finally {
  //     dispatch(setIsLoading(false))
  //   }
  // }

  useEffect(() => {
    params.itemId && dispatch(getItemById(params.itemId))
  }, [params.itemId])

  const onSubmit = () => {
    const newListing: ItemListingPost = {
      name: formInfo?.name?.trim() ?? '',
      price: formInfo?.price ?? 0,
      description: formInfo?.description?.trim() ?? '',
      typeOfTransaction: formInfo?.typeOfTransaction ?? 'Rent',
      deliveryInformation: formInfo?.deliveryInformation?.trim() ?? '',
      // tags: data.Tags.split(',').map((tag: string) => tag.trim()),
      tags: undefined, // TODO
      imageURL: selectedImageB64,
    }
    dispatch(updateItem(newListing, params.itemId!))
    console.table(newListing)
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
                  <ItemPicture src={formInfo?.imageURL ?? selectedImageURL} />
                  <PictureUploader
                    text="Upload Picture"
                    setSelectedImageBlob={setSelectedImageBlob}
                  />
                </LeftDiv>
                <RightDiv>
                  <PostForm onSubmit={handleSubmit(onSubmit)} noValidate>
                    <EntryDiv type="input">
                      <EntryName fontType={p}> Item Name&nbsp;</EntryName>
                      <ItemName fontType={p}>{formInfo.name}</ItemName>
                    </EntryDiv>
                    <EntryDiv type="input">
                      <EntryName fontType={p}> Listing Type&nbsp;</EntryName>
                      <Dropdown
                        title="ListingType"
                        placeholder="Listing Type"
                        options={['Rent', 'Sell']}
                        register={register}
                        value={formInfo?.typeOfTransaction}
                        onChange={(e) =>
                          formInfo &&
                          setFormInfo({
                            ...formInfo,
                            typeOfTransaction: e.target.value as 'Rent' | 'Sell',
                          })
                        }
                      />
                    </EntryDiv>
                    <EntryDiv type="input">
                      <EntryName fontType={p}>
                        Price <b>SG$</b> {formInfo?.typeOfTransaction === 'Rent' && '/day'}
                      </EntryName>
                      <InputField
                        title="Price"
                        type="number"
                        placeholder="Enter Price (in SGD)"
                        pattern={/^\d*\.?\d{0,2}$/}
                        register={register}
                        value={formInfo?.price}
                        onChange={(e) =>
                          formInfo && setFormInfo({ ...formInfo, price: Number(e.target.value) })
                        }
                      />
                    </EntryDiv>
                    <EntryDiv type="textarea">
                      <EntryName fontType={p}>Product Description&nbsp;</EntryName>
                      <EntryArea
                        title="ProductDescription"
                        placeholder="Description of your Product"
                        {...register('ProductDescription', { required: true })}
                        value={formInfo?.description}
                        onChange={(e) =>
                          formInfo && setFormInfo({ ...formInfo, description: e.target.value })
                        }
                      />
                    </EntryDiv>
                    <EntryDiv type="textarea">
                      <EntryName fontType={p}>Deal Information&nbsp;</EntryName>
                      <EntryArea
                        title="DealInformation"
                        placeholder="Include details such as Delivery and Payment methods"
                        {...register('DealInformation', { required: true })}
                        value={formInfo?.deliveryInformation}
                        onChange={(e) =>
                          formInfo &&
                          setFormInfo({ ...formInfo, deliveryInformation: e.target.value })
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
