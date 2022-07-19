import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { TEXTS } from '../../../common/texts'
import formatPrice from '../../../common/formatPrice'

import { getAnotherUserInfo } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import {
  createReservation,
  getItemById,
  makeTransaction,
  setCreateReservationStatus,
  setMakeTransactionStatus,
} from '../../../store/marketplace/actions'

import Button from '../../../components/common/Button/Button'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  BottomDivTitle,
  // ChatButton,
  DealButton,
  DealInfoDiv,
  DealSummaryCard,
  DealSummaryTitle,
  DescriptionDiv,
  DisclaimerDiv,
  InfoDiv,
  InfoRowDiv,
  InfoRowTitle,
  InfoRowValue,
  ItemOwnerUserDivStyled,
  ItemPicture,
  ItemShowcaseDiv,
  LeftDiv,
  OfferAlertUserDivStyled,
  OwnerInfoDiv,
  OwnerInfoSubDiv,
  OwnerName,
  StyledDealPage,
  Subheader,
} from './styles/DealPage.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import defaultPic from '../../../assets/picture.png'

const InfoRow = ({ title, content }: { title: string; content: string }) => {
  const theme = useTheme()
  const { h3 } = { ...theme.typography.fontSize }
  return (
    <InfoRowDiv fontType={h3}>
      <InfoRowTitle>{title}</InfoRowTitle>:&nbsp;
      <InfoRowValue>{content}</InfoRowValue>
    </InfoRowDiv>
  )
}

const DealPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<{ itemId: string }>()
  const { h1, h2, h3, p } = { ...theme.typography.fontSize }
  const { isLoggedIn, userFirebaseProfile, isLoading } = useAppSelector(
    (state) => state.auth_reducer,
  )
  const { selectedItemData, createReservationStatus, makeTransactionStatus } = useAppSelector(
    (state) => state.marketplace_reducer,
  )

  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)
  const [buyerInfo, setBuyerInfo] = useState<UserData | null>(null)

  const status =
    selectedItemData.createdBy === userFirebaseProfile.uid && selectedItemData.status === 'OFFERED'
      ? 'confirm'
      : 'offer'

  useEffect(() => {
    dispatch(getItemById(params.itemId!))
  }, [])

  useEffect(() => {
    if (createReservationStatus === 'SUCCESS') {
      navigate(`${PATHS.ITEM}/${params.itemId}`)
      dispatch(setCreateReservationStatus('INITIAL'))
    }
  }, [createReservationStatus])

  useEffect(() => {
    if (makeTransactionStatus === 'SUCCESS') {
      navigate(`${PATHS.ITEM}/${params.itemId}`)
      dispatch(setMakeTransactionStatus('INITIAL'))
    }
  }, [makeTransactionStatus])

  useEffect(() => {
    if (status === 'offer')
      selectedItemData?.createdBy &&
        dispatch(getAnotherUserInfo(selectedItemData.createdBy, setOwnerInfo))
    else if (status === 'confirm')
      selectedItemData?.offeredBy &&
        dispatch(getAnotherUserInfo(selectedItemData.offeredBy, setBuyerInfo))
  }, [selectedItemData])

  const makeDealOnClick = () => {
    params.itemId && dispatch(createReservation(params.itemId))
  }

  const confirmDealOnClick = () => {
    params.itemId && dispatch(makeTransaction(params.itemId))
  }

  const renderOfferAlertUserDiv = () => (
    <OfferAlertUserDivStyled>
      <BottomDivTitle fontType={h3}>buyer details:</BottomDivTitle>
      <OwnerInfoDiv>
        <OwnerInfoSubDiv>
          <ProfilePic src={defaultAvatar} diameter="55px" round />
          <OwnerName fontType={h3}>{buyerInfo?.username}</OwnerName>
        </OwnerInfoSubDiv>
        <Button
          style={{ width: '15vw', borderRadius: 0 }}
          text="🗨️ Chat"
          onClick={() =>
            selectedItemData && navigate(`${PATHS.CHAT}/${selectedItemData.offeredBy}`)
          }
          color="primary"
        />
      </OwnerInfoDiv>
    </OfferAlertUserDivStyled>
  )

  const renderItemOwnerUserDiv = () => (
    <ItemOwnerUserDivStyled>
      <BottomDivTitle fontType={h3}>listed by:</BottomDivTitle>
      <OwnerInfoDiv>
        <OwnerInfoSubDiv>
          <ProfilePic src={defaultAvatar} diameter="55px" round />
          <OwnerName fontType={h3}>{ownerInfo?.username}</OwnerName>
        </OwnerInfoSubDiv>
        <Button
          style={{ width: '15vw', borderRadius: 0 }}
          text="🗨️ Chat"
          onClick={() =>
            selectedItemData && navigate(`${PATHS.CHAT}/${selectedItemData.createdBy}`)
          }
          color="primary"
        />
      </OwnerInfoDiv>
    </ItemOwnerUserDivStyled>
  )

  return (
    <StyledDealPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        selectedItemData && (
          <>
            <LeftDiv>
              {status === 'confirm' && renderOfferAlertUserDiv()}
              <ItemShowcaseDiv>
                <ItemPicture src={defaultPic} />
              </ItemShowcaseDiv>
              {status === 'offer' && renderItemOwnerUserDiv()}
            </LeftDiv>
            <InfoDiv>
              <Button
                text="< Back"
                onClick={() => navigate(`${PATHS.ITEM}/${params.itemId}`)}
                style={{ width: '200px', margin: '2vw 0' }}
              />
              <DealSummaryCard>
                <DealSummaryTitle fontType={h1}>Deal Summary</DealSummaryTitle>
                <InfoRow title="Item Name" content={selectedItemData.name} />
                <InfoRow title="Deal Type" content={selectedItemData.typeOfTransaction} />
                <InfoRow title="Cost" content={`$${formatPrice(selectedItemData.price)}`} />
                <DealInfoDiv fontType={p}>
                  <Subheader fontType={h2}>Deal Information:</Subheader>
                  <DescriptionDiv fontType={p}>
                    {selectedItemData.deliveryInformation}
                  </DescriptionDiv>
                </DealInfoDiv>
              </DealSummaryCard>
              {status === 'offer' ? (
                <DealButton
                  style={{ width: '43vw', borderRadius: 0, marginTop: '20px' }}
                  text="Make Offer to Seller"
                  onClick={makeDealOnClick}
                  color="danger"
                />
              ) : (
                <DealButton
                  style={{ width: '43vw', borderRadius: 0, marginTop: '20px' }}
                  text="Confirm Offer from Buyer"
                  onClick={confirmDealOnClick}
                  color="danger"
                />
              )}
              <DisclaimerDiv fontType={p}>
                <b>Disclaimer: </b>
                {TEXTS.DEAL_DISCLAIMER}
              </DisclaimerDiv>
            </InfoDiv>
          </>
        )
      )}
    </StyledDealPage>
  )
}

export default DealPage
