import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpsCallable } from 'firebase/functions'
import { ref, onValue, set } from 'firebase/database'
import { useTheme } from 'styled-components'

import { database, functions } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'

import { getAnotherUserInfo, setIsLoading } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'
import { ChatMetadata } from '../../../store/marketplace/types'

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
  const { isLoading, isLoggedIn, userFirebaseProfile } = useAppSelector(
    (state) => state.auth_reducer,
  )
  const { selectedItemData } = useAppSelector((state) => state.marketplace_reducer)

  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)
  const [offererInfo, setOffererInfo] = useState<UserData | null>(null)

  const userHasAnOffer =
    selectedItemData?.createdBy === userFirebaseProfile.uid &&
    selectedItemData?.status === 'offered'

  // const [userUID, setUserUID] = useState()

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
    params.itemId && dispatch(getItemById(params.itemId))
  }, [params.itemId])

  // useEffect(() => {
  //   dispatch(setIsLoading(false))
  // }, [itemInfo])

  useEffect(() => {
    console.log(selectedItemData)
    selectedItemData?.createdBy &&
      dispatch(getAnotherUserInfo(selectedItemData.createdBy, setOwnerInfo))
    userHasAnOffer &&
      selectedItemData?.offeredBy &&
      dispatch(getAnotherUserInfo(selectedItemData.offeredBy, setOffererInfo))
  }, [selectedItemData])

  useEffect(() => {
    console.log('the glorious owner info UID\n\n', ownerInfo)
  }, [ownerInfo])

  const chatOnClick = (targetUserUID: string) => {
    const userUID = userFirebaseProfile.uid!
    const userRef = ref(database, 'users/' + userUID + '/chats')

    if (!isLoggedIn) return alert('Please Log In to use this Feature!')

    onValue(userRef, (snapshot) => {
      const data: Record<string, string> = snapshot.val()

      if (data && targetUserUID in data) {
        const chatUID = data[targetUserUID]
        navigate(`${PATHS.CHAT}/${chatUID}`)
      } else {
        // // Create new chat
        const newChatUID = crypto.randomUUID()
        const newChatRef = ref(database, 'chats/' + newChatUID)
        const userChatsRef = ref(database, 'users/' + userUID + '/chats/' + targetUserUID)
        const targetChatsRef = ref(database, 'users/' + targetUserUID + '/chats/' + userUID)

        // Set data in 'chats/'
        const newChat: ChatMetadata = {
          id: newChatUID,
          createdAt: Date.now(),
          createdBy: userFirebaseProfile.uid!,
          receipient: targetUserUID,
          itemListing: selectedItemData!._id,
          recentMessage: null,
        }
        set(newChatRef, newChat)

        // set data in 'users/'
        set(userChatsRef, newChatUID)
        set(targetChatsRef, newChatUID)
        navigate(`${PATHS.CHAT}/${newChatUID}`)
      }
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
    makeTransaction(selectedItemData!._id)

    // navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledItemPage>
      {isLoading ? (
        <LoadingSpin />
      ) : selectedItemData ? (
        <>
          <LeftDiv>
            {
              //TODO abstract this
              userHasAnOffer && (
                <TopDiv>
                  <BottomDivTitle fontType={h3}>You have an offer! (TODO)</BottomDivTitle>
                  <OwnerDiv>
                    <OwnerSubDiv>
                      <ProfilePic
                        src={offererInfo?.imageURL?.length ? offererInfo.imageURL : defaultAvatar}
                        diameter="55px"
                        round
                      />
                      <OwnerName fontType={h3}>
                        {offererInfo?.username.length ? offererInfo.username : offererInfo?.name}
                      </OwnerName>
                    </OwnerSubDiv>
                    <Button
                      style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
                      text="🗨️ Chat"
                      onClick={() => selectedItemData && chatOnClick(selectedItemData.offeredBy)}
                    />
                    <Button
                      style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
                      text="Accept"
                      onClick={dealAcceptOnClick}
                    />
                  </OwnerDiv>
                </TopDiv>
              )
            }

            <TypeBannerDiv>
              <TypeBannerPic src={saleBannerPic} />
              <TypeBannerText>{selectedItemData.typeOfTransaction}</TypeBannerText>
            </TypeBannerDiv>
            <ItemShowcaseDiv>
              <ItemPicture src={selectedItemData.imageURL ?? defaultPic} />
            </ItemShowcaseDiv>

            {selectedItemData?.createdBy !== userFirebaseProfile.uid && (
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
                    onClick={() => chatOnClick(selectedItemData!.createdBy)}
                  />
                </OwnerDiv>
              </BottomDiv>
            )}
          </LeftDiv>

          <InfoDiv>
            <ItemName fontType={h2}>{selectedItemData.name}</ItemName>
            <PriceTag fontType={h1}>
              ${formatPrice(selectedItemData.price)}
              <PerDayHighlight>
                {selectedItemData.typeOfTransaction === 'Rent' && ' /day'}
              </PerDayHighlight>
            </PriceTag>
            <DescriptionDiv fontType={p}>{selectedItemData.description}</DescriptionDiv>
            <DealInfoDiv fontType={p}>
              <Subheader fontType={h2}>Deal Information</Subheader>
              <DescriptionDiv fontType={p}>{selectedItemData.deliveryInformation}</DescriptionDiv>
            </DealInfoDiv>
            <ItemConditionSpan>
              <Subheader fontType={h2}>Item Condition:&nbsp;</Subheader>
              <DescriptionDiv fontType={p}>Very Good</DescriptionDiv>
            </ItemConditionSpan>
            {/* <TagsDiv>
              <Subheader fontType={h2}>Tags</Subheader>
              <TagsContainer>
                {selectedItemData.tags?.map((tag, index) => (
                  <Tag key={index} label={tag} />
                ))}
              </TagsContainer>
            </TagsDiv> */}

            {selectedItemData?.createdBy === userFirebaseProfile.uid ? (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="Edit Listing✏️"
                onClick={editOnClick}
              />
            ) : selectedItemData?.status === 'offered' ? (
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
