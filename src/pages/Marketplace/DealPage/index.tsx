import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpsCallable } from 'firebase/functions'
import { useTheme } from 'styled-components'

import { auth, functions } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { TEXTS } from '../../../common/texts'
import formatPrice from '../../../common/formatPrice'

import { getAnotherUserInfo, setIsLoading } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'

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
import axios from 'axios'
import { BASE_URL, ENDPOINTS, TIMEOUT, TYPE } from '../../../store/api'
import { onAuthStateChanged } from 'firebase/auth'

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
  const { selectedItemData } = useAppSelector((state) => state.marketplace_reducer)

  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)
  const [buyerInfo, setBuyerInfo] = useState<UserData | null>(null)

  const createReservation_old = async (itemId: string) => {
    dispatch(setIsLoading(true))
    try {
      const createReservation = httpsCallable(functions, 'createReservation')
      const result = (await createReservation({ item_id: itemId })) as any
      const success = result.data.success as boolean
      if (!success) {
        console.log(result)
        throw new Error("create reservation don't success")
      }
      console.log('reservation', result)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const createReservation = (itemId: string) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setIsLoading(true) as any)
        const userUID = user.uid
        try {
          const getItemById = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
            headers: { uid: userUID },
          })
          const response = await getItemById.get(`${ENDPOINTS.RESERVATION}?item_id=${itemId}`)
        } catch (e) {
          console.error('The error is:\n', e as Error)
        } finally {
          dispatch(setIsLoading(false) as any)
        }
      } else {
        // alert('not logged in!')
      }
    })
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
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const status =
    selectedItemData.createdBy === userFirebaseProfile.uid && selectedItemData.status === 'OFFERED'
      ? 'confirm'
      : 'offer'

  useEffect(() => {
    dispatch(getItemById(params.itemId!))
  }, [])

  useEffect(() => {
    console.log(selectedItemData)
    if (status === 'offer')
      selectedItemData?.createdBy &&
        dispatch(getAnotherUserInfo(selectedItemData.createdBy, setOwnerInfo))
    else if (status === 'confirm')
      selectedItemData?.offeredBy &&
        dispatch(getAnotherUserInfo(selectedItemData.offeredBy, setBuyerInfo))
  }, [selectedItemData])

  const makeDealOnClick = () => {
    if (params.itemId) {
      createReservation(params.itemId)
      navigate(`${PATHS.ITEM}/${params.itemId}`)
      window.location.reload()
    }
  }

  const confirmDealOnClick = () => {
    if (params.itemId) {
      makeTransaction(params.itemId)
      navigate(`${PATHS.ITEM}/${params.itemId}`)
      window.location.reload()
    }
  }

  const OfferAlertUserDiv = () => (
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

  const ItemOwnerUserDiv = () => (
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
              {status === 'confirm' && <OfferAlertUserDiv />}
              <ItemShowcaseDiv>
                <ItemPicture src={defaultPic} />
              </ItemShowcaseDiv>
              {status === 'offer' && <ItemOwnerUserDiv />}
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
