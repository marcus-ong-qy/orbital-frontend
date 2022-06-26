import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { theme } from '../../../styles/Theme'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { TEXTS } from '../../../common/texts'
import formatPrice from '../../../common/formatPrice'
import { UserData } from '../../../store/authentication/types'
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
import { setIsLoading } from '../../../store/authentication/actions'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../../../firebase'

const InfoRow = ({ title, content }: { title: string; content: string }) => {
  const { h3 } = { ...theme.typography.fontSize }
  return (
    <InfoRowDiv fontType={h3}>
      <InfoRowTitle>{title}</InfoRowTitle>:&nbsp;
      <InfoRowValue>{content}</InfoRowValue>
    </InfoRowDiv>
  )
}

const DealPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<{ itemId: string }>()
  const { h2, h3, p } = { ...theme.typography.fontSize }
  const { isLoading } = useAppSelector((state) => state.auth_reducer)

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const getItemInfo = async (itemId: string) => {
    console.log('infoing')
    dispatch(setIsLoading(true))
    try {
      const getItemById = httpsCallable(functions, 'getItemById')
      const result = (await getItemById({ id: itemId })) as any
      const success = result.data.sucess as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("don't success")
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
      const success = result.data.sucess as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("don't success")
      }
      console.log(result)
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
    itemInfo?.createdBy && getOwnerData(itemInfo.createdBy)
  }, [itemInfo])

  const chatOnClick = () => {
    // navigate(`${PATHS.CHAT}/${ownerInfo?.firebaseUID}`)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
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
                    style={{ width: '15vw', borderRadius: '0' }}
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
                style={{ width: '43vw', borderRadius: '0', marginTop: '20px' }}
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
