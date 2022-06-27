import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'

import { auth, functions } from '../../../firebase'
import { theme } from '../../../styles/Theme'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'

import { setIsLoading } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { ItemListing } from '../../../store/marketplace/types'

import Button from '../../../components/common/Button/Button'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  BottomDiv,
  BottomDivTitle,
  DealInfoDiv,
  DescriptionDiv,
  InfoDiv,
  ItemConditionSpan,
  ItemName,
  ItemPicture,
  ItemShowcaseDiv,
  LeftDiv,
  OwnerDiv,
  OwnerName,
  OwnerSubDiv,
  PriceTag,
  StyledItemPage,
  Subheader,
  TagDiv,
  TagsDiv,
  TagsContainer,
  TypeBannerDiv,
  TypeBannerPic,
  TypeBannerText,
  PerDayHighlight,
  TopDiv,
} from './styles/ItemPage.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import defaultPic from '../../../assets/picture.png'
import saleBannerPic from '../../../assets/trade.png'

// TODO create collapsible for tags
// TODO allow Button to have custom fonts and stylings

const Tag = ({ label }: { label: string }) => {
  const { h2 } = { ...theme.typography.fontSize }

  const onClick = () => {
    // TODO
    console.log(label)
  }

  return (
    <TagDiv fontType={h2} onClick={onClick}>
      {label}
    </TagDiv>
  )
}

const ItemPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<{ itemId: string }>()
  const { h1, h2, h3, p } = { ...theme.typography.fontSize }
  const { isLoading } = useAppSelector((state) => state.auth_reducer)

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const [userUID, setUserUID] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUserUID(user.uid)
      console.log('this is the uid of me:\n\n', user.uid)
    })
  }, [])

  const getItemInfo = async (itemId: string) => {
    dispatch(setIsLoading(true))
    try {
      const getItemById = httpsCallable(functions, 'getItemById')
      const result = (await getItemById({ id: itemId })) as any
      const success = result.data.sucess as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("get item info don't success")
      }
      console.log(result)
      const info: ItemListing = result.data.message._doc
      setItemInfo(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const getOwnerData = async (firebaseUID: string) => {
    dispatch(setIsLoading(true))
    try {
      const getAnotherUserInfo = httpsCallable(functions, 'getAnotherUserInfo')
      const result = (await getAnotherUserInfo({ uid: firebaseUID })) as any
      const success = result.data.success as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log('owner data', result)
        throw new Error("get owner data don't success")
      }
      console.log('owner data', result)
      const info: UserData = result.data.message._doc
      setOwnerInfo(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    getItemInfo(params.itemId!)
  }, [])

  useEffect(() => {
    console.log(itemInfo)
    itemInfo?.currentOwner && getOwnerData(itemInfo.currentOwner)
  }, [itemInfo])

  useEffect(() => {
    console.log('the glorious', ownerInfo)
  }, [ownerInfo])

  const chatOnClick = () => {
    navigate(`${PATHS.CHAT}/${itemInfo?.currentOwner}`)
  }

  const editOnClick = () => {
    navigate(`${PATHS.EDIT_ITEM}/${params.itemId}`)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledItemPage>
      {isLoading ? (
        <LoadingSpin />
      ) : itemInfo ? (
        <>
          <LeftDiv>
            {itemInfo?.createdBy === userUID && "itemInfo?.status === 'RESERVED'" && (
              <TopDiv>
                <BottomDivTitle fontType={h3}>You have an offer! (TODO)</BottomDivTitle>
                <OwnerDiv>
                  <OwnerSubDiv>
                    <ProfilePic src={defaultAvatar} diameter="55px" round />
                    <OwnerName fontType={h3}>{'itemInfo.buyer'}</OwnerName>
                  </OwnerSubDiv>
                  <Button
                    style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
                    text="🗨️ Chat"
                    onClick={chatOnClick}
                  />
                  <Button
                    style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
                    text="Accept"
                    onClick={() => console.log('TODO')}
                  />
                </OwnerDiv>
              </TopDiv>
            )}

            <TypeBannerDiv>
              <TypeBannerPic src={saleBannerPic} />
              <TypeBannerText>{itemInfo.typeOfTransaction}</TypeBannerText>
            </TypeBannerDiv>
            <ItemShowcaseDiv>
              <ItemPicture src={itemInfo.imageURL ?? defaultPic} />
            </ItemShowcaseDiv>

            {itemInfo?.createdBy !== userUID && (
              <BottomDiv>
                <BottomDivTitle fontType={h3}>listed by:</BottomDivTitle>
                <OwnerDiv>
                  <OwnerSubDiv>
                    <ProfilePic src={defaultAvatar} diameter="55px" round />
                    <OwnerName fontType={h3}>{ownerInfo?.username}</OwnerName>
                  </OwnerSubDiv>
                  <Button
                    style={{ width: '15vw', borderRadius: 0 }}
                    text="🗨️ Chat"
                    onClick={chatOnClick}
                  />
                </OwnerDiv>
              </BottomDiv>
            )}
          </LeftDiv>

          <InfoDiv>
            <ItemName fontType={h2}>{itemInfo.name}</ItemName>
            <PriceTag fontType={h1}>
              ${formatPrice(itemInfo.price)}
              <PerDayHighlight>{itemInfo.typeOfTransaction === 'Rent' && ' /day'}</PerDayHighlight>
            </PriceTag>
            <DescriptionDiv fontType={p}>{itemInfo.description}</DescriptionDiv>
            <DealInfoDiv fontType={p}>
              <Subheader fontType={h2}>Deal Information</Subheader>
              <DescriptionDiv fontType={p}>{itemInfo.deliveryInformation}</DescriptionDiv>
            </DealInfoDiv>
            <ItemConditionSpan>
              <Subheader fontType={h2}>Item Condition:&nbsp;</Subheader>
              <DescriptionDiv fontType={p}>Very Good</DescriptionDiv>
            </ItemConditionSpan>
            {/* <TagsDiv>
              <Subheader fontType={h2}>Tags</Subheader>
              <TagsContainer>
                {itemInfo.tags?.map((tag, index) => (
                  <Tag key={index} label={tag} />
                ))}
              </TagsContainer>
            </TagsDiv> */}

            {itemInfo?.createdBy === userUID ? (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="Edit Listing✏️"
                onClick={editOnClick}
              />
            ) : (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="Make An Offer"
                onClick={dealOnClick}
              />
            )}
          </InfoDiv>
        </>
      ) : (
        <h1>Item Not Found</h1>
      )}
    </StyledItemPage>
  )
}

export default ItemPage
