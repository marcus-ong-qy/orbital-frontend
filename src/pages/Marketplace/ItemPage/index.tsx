import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ref, set, get, child } from 'firebase/database'
import { useTheme } from 'styled-components'
import { toast } from 'react-toastify'

import { database } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import formatPrice from '../../../common/formatPrice'

import { getAnotherUserInfo } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'
import { ChatMetadata } from '../../../store/marketplace/types'

import Button from '../../../components/common/Button/Button'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'
import PleaseLoginToasterText from '../../../components/common/PleaseLoginToasterText/PleaseLoginToasterText'

import {
  ItemOwnerUserDivStyled,
  BottomDivTitle,
  DealInfoDiv,
  DescriptionDiv,
  InfoDiv,
  ItemConditionSpan,
  ItemName,
  ItemPicture,
  ItemShowcaseDiv,
  LeftDiv,
  UserInfoDiv,
  UserInfoNameLink,
  UserInfoSubDiv,
  PriceTag,
  StyledItemPage,
  Subheader,
  TagDiv,
  TagsDiv,
  TagsContainer,
  PerDayHighlight,
  OfferAlertUserDivStyled,
  OfferAlertBuffer,
  PriceDiv,
  StatusTagStyled,
} from './styles/ItemPage.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import defaultPic from '../../../assets/picture.png'
import saleBannerPic from '../../../assets/trade.png'

import 'react-toastify/dist/ReactToastify.css'

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

  const [toastShown, setToastShown] = useState(false)

  const userHasAnOffer =
    selectedItemData?.createdBy === userFirebaseProfile.uid &&
    selectedItemData?.status === 'OFFERED'

  const offererName = offererInfo?.username?.length ? offererInfo.username : offererInfo?.name

  useEffect(() => {
    params.itemId && dispatch(getItemById(params.itemId))
  }, [params.itemId])

  useEffect(() => {
    selectedItemData?.createdBy &&
      dispatch(getAnotherUserInfo(selectedItemData.createdBy, setOwnerInfo))
    userHasAnOffer &&
      selectedItemData?.offeredBy &&
      dispatch(getAnotherUserInfo(selectedItemData.offeredBy, setOffererInfo))
  }, [selectedItemData])

  useEffect(() => {
    console.log(selectedItemData)
  }, [selectedItemData])

  const userHasAnOfferToast = () => {
    setToastShown(true)
    toast(
      <>
        You have an offer from <b>{offererName}</b>!
      </>,
      { toastId: 'user-has-an-offer-toast' },
    )
  }

  const chatOnClick = (targetUserUID: string) => {
    if (!isLoggedIn) return toast.error(<PleaseLoginToasterText />)

    const userUID = userFirebaseProfile.uid!
    const userRef = ref(database, 'users/' + userUID)

    get(child(userRef, '/chats')).then((snapshot) => {
      const data: Record<string, string> | undefined = snapshot.val()

      if (data && targetUserUID in data) {
        // redirect to existing chat
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
    if (!isLoggedIn) return toast.error(<PleaseLoginToasterText />, { toastId: 'please-login' })
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  const dealAcceptOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  const renderOfferAlertUserDiv = () => {
    !toastShown && userHasAnOfferToast()
    return (
      <OfferAlertUserDivStyled>
        <BottomDivTitle fontType={h3}>You have an offer!</BottomDivTitle>
        <UserInfoDiv>
          <UserInfoSubDiv>
            <ProfilePic
              src={offererInfo?.imageURL?.length ? offererInfo.imageURL : defaultAvatar}
              diameter="55px"
              round
            />
            <UserInfoNameLink onClick={() => alert('TODO')} fontType={h3}>
              {offererInfo?.username?.length ? offererInfo.username : offererInfo?.name}
            </UserInfoNameLink>
          </UserInfoSubDiv>
          <Button
            style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
            text="🗨️ Chat"
            onClick={() => selectedItemData && chatOnClick(selectedItemData.offeredBy)}
            color="primary"
          />
          <Button
            style={{ width: 'min(12vw, 160px)', borderRadius: 0 }}
            text="Accept"
            onClick={dealAcceptOnClick}
            color="primary"
          />
        </UserInfoDiv>
      </OfferAlertUserDivStyled>
    )
  }

  const renderItemOwnerUserDiv = () => (
    <ItemOwnerUserDivStyled>
      <BottomDivTitle fontType={h3}>listed by:</BottomDivTitle>
      <UserInfoDiv>
        <UserInfoSubDiv>
          <ProfilePic
            src={ownerInfo?.imageURL?.length ? ownerInfo.imageURL : defaultAvatar}
            diameter="55px"
            round
          />
          <UserInfoNameLink fontType={h3} onClick={() => alert('TODO')}>
            {ownerInfo?.username?.length ? ownerInfo.username : ownerInfo?.name}
          </UserInfoNameLink>
        </UserInfoSubDiv>
        <Button
          style={{ width: '15vw', borderRadius: 0 }}
          text="🗨️ Chat"
          onClick={() => chatOnClick(selectedItemData.createdBy)}
          color="primary"
        />
      </UserInfoDiv>
    </ItemOwnerUserDivStyled>
  )

  const renderStatusTag = () => {
    const { typeOfTransaction: type, status } = { ...selectedItemData }
    let statusText = ''

    switch (status) {
      case 'AVAILABLE':
        statusText = type === 'SELL' ? 'Sale' : 'Rent'
        break
      case 'OFFERED':
        statusText = 'Reserved'
        break
      case 'SOLD':
      case 'Sold' as any: // TODO check with backend
        statusText = type === 'SELL' ? 'Sold' : 'Rented'
        break
    }

    return (
      <StatusTagStyled type={type} status={status}>
        {statusText}
      </StatusTagStyled>
    )
  }

  return (
    <StyledItemPage>
      {isLoading ? (
        <LoadingSpin />
      ) : selectedItemData ? (
        <>
          <LeftDiv>
            {userHasAnOffer && offererName && renderOfferAlertUserDiv()}
            {/* <TypeBannerDiv>
              <TypeBannerPic src={saleBannerPic} />
              <TypeBannerText>{selectedItemData.typeOfTransaction}</TypeBannerText>
            </TypeBannerDiv> */}
            <ItemShowcaseDiv>
              <ItemPicture src={selectedItemData.imageURL[0] ?? defaultPic} />
            </ItemShowcaseDiv>
            {selectedItemData?.createdBy !== userFirebaseProfile.uid && renderItemOwnerUserDiv()}
          </LeftDiv>

          <InfoDiv>
            {userHasAnOffer && <OfferAlertBuffer />}
            <ItemName fontType={h2}>{selectedItemData.name}</ItemName>
            <PriceDiv fontType={h1}>
              {renderStatusTag()}
              &nbsp;for&nbsp;
              <PriceTag>
                ${formatPrice(selectedItemData.price)}
                <PerDayHighlight>
                  {selectedItemData.typeOfTransaction === 'RENT' && ' /day'}
                </PerDayHighlight>
              </PriceTag>
            </PriceDiv>
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
                color="secondary"
              />
            ) : selectedItemData?.status === 'OFFERED' ? (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="⚠️ Item Reserved"
                onClick={() => {}}
                color="danger"
                disabled
              />
            ) : (
              <Button
                style={{
                  marginTop: '24px',
                  borderRadius: 0,
                }}
                text="Make An Offer"
                onClick={dealOfferOnClick}
                color="primary"
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
