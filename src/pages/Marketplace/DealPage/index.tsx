import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpsCallable } from 'firebase/functions'
import { useTheme } from 'styled-components'

import { functions } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { TEXTS } from '../../../common/texts'
import formatPrice from '../../../common/formatPrice'

import { getAnotherUserInfo, setIsLoading } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'
import { ItemListing } from '../../../store/marketplace/types'

import Button from '../../../components/common/Button/Button'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  BottomDiv,
  BottomDivTitle,
  // ChatButton,
  DealButton,
  DealInfoDiv,
  DealSummaryCard,
  DescriptionDiv,
  DisclaimerDiv,
  InfoDiv,
  InfoRowDiv,
  InfoRowTitle,
  InfoRowValue,
  ItemPicture,
  ItemShowcaseDiv,
  LeftDiv,
  OwnerDiv,
  OwnerName,
  OwnerSubDiv,
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
  const { h2, h3, p } = { ...theme.typography.fontSize }
  const { isLoading } = useAppSelector((state) => state.auth_reducer)

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const createReservation = async (itemId: string) => {
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
      const info: UserData = result.data.message._doc
      setOwnerInfo(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    dispatch(getItemById(params.itemId!, setItemInfo))
  }, [])

  useEffect(() => {
    console.log(itemInfo)
    itemInfo?.createdBy && dispatch(getAnotherUserInfo(itemInfo.createdBy, setOwnerInfo))
  }, [itemInfo])

  const chatOnClick = () => {
    // navigate(`${PATHS.CHAT}/${ownerInfo?.firebaseUID}`)
  }

  const dealOnClick = () => {
    createReservation(params.itemId!)
    navigate(`${PATHS.ITEM}/${params.itemId}`)
  }

  return (
    <StyledDealPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        itemInfo && (
          <>
            <LeftDiv>
              <ItemShowcaseDiv>
                <ItemPicture src={defaultPic} />
              </ItemShowcaseDiv>
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
            </LeftDiv>
            <InfoDiv>
              <DealSummaryCard>
                <InfoRow title="Item Name" content={itemInfo.name} />
                <InfoRow title="Deal Type" content={itemInfo.typeOfTransaction} />
                <InfoRow title="Cost" content={`$${formatPrice(itemInfo.price)}`} />
                <DealInfoDiv fontType={p}>
                  <Subheader fontType={h2}>Deal Information:</Subheader>
                  <DescriptionDiv fontType={p}>{itemInfo.deliveryInformation}</DescriptionDiv>
                </DealInfoDiv>
              </DealSummaryCard>
              <DealButton
                style={{ width: '43vw', borderRadius: 0, marginTop: '20px' }}
                text="Confirm Offer"
                onClick={dealOnClick}
              />
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
