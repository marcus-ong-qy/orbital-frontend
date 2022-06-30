import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { ref, onValue, set } from 'firebase/database'
import { useTheme } from 'styled-components'

import { auth, database, functions, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'

import { setIsLoading } from '../../../store/authentication/actions'
import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile, UserData } from '../../../store/authentication/types'
import { ChatMetadata, ItemListing } from '../../../store/marketplace/types'

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
  const theme = useTheme()
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
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<{ itemId: string }>()
  const { h1, h2, h3, p } = { ...theme.typography.fontSize }
  const { isLoading } = useAppSelector((state) => state.auth_reducer)

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)
  const [offererInfo, setOffererInfo] = useState<UserData | null>(null)

  // const [userUID, setUserUID] = useState()

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user: any) => {
  //     setUserUID(user.uid)
  //     console.log('this is the uid of me:\n\n', user.uid)
  //   })
  // }, [])

  const getItemInfo = async (itemId: string) => {
    dispatch(setIsLoading(true))
    try {
      const getItemById = httpsCallable(functions, 'getItemById')
      const result = (await getItemById({ id: itemId })) as any
      const success = result.data.sucess as boolean
      if (!success) {
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

  const getOffererData = async (firebaseUID: string) => {
    dispatch(setIsLoading(true))
    try {
      const getAnotherUserInfo = httpsCallable(functions, 'getAnotherUserInfo')
      const result = (await getAnotherUserInfo({ uid: firebaseUID })) as any
      const success = result.data.success as boolean
      if (!success) {
        console.log('owner data', result)
        throw new Error("get owner data don't success")
      }
      console.log('owner data', result)
      const info: UserData = result.data.message._doc
      setOffererInfo(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const makeTransaction = async (itemId: string) => {
    dispatch(setIsLoading(true))
    try {
      const makeTransaction = httpsCallable(functions, 'makeTransaction')
      const result = (await makeTransaction({ item_id: itemId })) as any
      const success = result.data.success as boolean
      if (!success) {
        console.log(result)
        throw new Error("make transaction don't success")
      }
      console.log('transaction', result)
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
    itemInfo?.offeredBy && getOffererData(itemInfo.offeredBy)
  }, [itemInfo])

  useEffect(() => {
    console.log('the glorious\n\n', ownerInfo)
  }, [ownerInfo])

  const chatOnClick = (targetUID: string) => {
    const userUID = userFirebaseProfile.uid!
    const userChatsUIDRef = ref(database, 'users/' + userUID + '/chats')
    const newChatUID = crypto.randomUUID()
    const newChatRef = ref(database, 'chats/' + newChatUID)

    if (!isLoggedIn) return alert('Please Log In to use this Feature!')

    onValue(userChatsUIDRef, (snapshot) => {
      const data: Record<string, string> = snapshot.val()

      if (data && targetUID in data) {
        const chatUID = data[targetUID]
        navigate(`${PATHS.CHAT}/${chatUID}`)
      } else {
        // // Create new chat

        // Set data in 'chats/'
        const newChat: ChatMetadata = {
          id: newChatUID,
          createdAt: Date.now(),
          createdBy: userFirebaseProfile.uid!,
          receipient: targetUID,
          itemListing: itemInfo!._id,
          recentMessage: null,
        }
        set(newChatRef, newChat)
      }
    })

    onValue(newChatRef, () => {
      // Set data in 'users/'
      console.log('i reffing u always')
      const ownerUID = targetUID
      const userRef = ref(database, 'users/' + userUID + '/chats')
      const ownerRef = ref(database, 'users/' + ownerUID + '/chats')

      const userChatRecord: Record<string, string> = {}
      userChatRecord[ownerUID] = newChatUID
      const ownerChatRecord: Record<string, string> = {}
      ownerChatRecord[userUID] = newChatUID

      set(userRef, userChatRecord)
      set(ownerRef, ownerChatRecord)

      navigate(`${PATHS.CHAT}/${newChatUID}`)
    })
  }

  const editOnClick = () => {
    navigate(`${PATHS.EDIT_ITEM}/${params.itemId}`)
  }

  const dealOfferOnClick = () => {
    if (!isLoggedIn) return alert('Please Log In to use this Feature!')

    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  const dealAcceptOnClick = () => {
    makeTransaction(itemInfo!._id)

    // navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledItemPage>
      {isLoading ? (
        <LoadingSpin />
      ) : itemInfo ? (
        <>
          <LeftDiv>
            {itemInfo?.createdBy === userFirebaseProfile.uid && itemInfo?.status === 'offered' && (
              <TopDiv>
                <BottomDivTitle fontType={h3}>You have an offer! (TODO)</BottomDivTitle>
                <OwnerDiv>
                  <OwnerSubDiv>
                    <ProfilePic src={defaultAvatar} diameter="55px" round />
                    <OwnerName fontType={h3}>
                      {offererInfo?.username.length ? offererInfo.username : offererInfo?.name}
                    </OwnerName>
                  </OwnerSubDiv>
                  <Button
                    style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
                    text="🗨️ Chat"
                    onClick={() => chatOnClick(itemInfo!.offeredBy)}
                  />
                  <Button
                    style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
                    text="Accept"
                    onClick={dealAcceptOnClick}
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

            {itemInfo?.createdBy !== userFirebaseProfile.uid && (
              <BottomDiv>
                <BottomDivTitle fontType={h3}>listed by:</BottomDivTitle>
                <OwnerDiv>
                  <OwnerSubDiv>
                    <ProfilePic
                      src={ownerInfo?.imageURL?.length ? ownerInfo.imageURL : defaultAvatar}
                      diameter="55px"
                      round
                    />
                    <OwnerName fontType={h3}>{ownerInfo?.username}</OwnerName>
                  </OwnerSubDiv>
                  <Button
                    style={{ width: '15vw', borderRadius: 0 }}
                    text="🗨️ Chat"
                    onClick={() => chatOnClick(itemInfo!.currentOwner)}
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

            {itemInfo?.createdBy === userFirebaseProfile.uid ? (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="Edit Listing✏️"
                onClick={editOnClick}
              />
            ) : itemInfo?.status === 'offered' ? (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="⚠️ Item Reserved"
                onClick={() => {}}
              />
            ) : (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="Make An Offer"
                onClick={dealOfferOnClick}
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
