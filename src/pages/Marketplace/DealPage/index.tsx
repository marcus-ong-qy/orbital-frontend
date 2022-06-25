import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'
import { TEXTS } from '../../../common/texts'
import formatPrice from '../../../common/formatPrice'
import { UserData } from '../../../store/authentication/types'
import { ItemListing } from '../../../store/marketplace/types'

import Button from '../../../components/common/Button/Button'

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
  const params = useParams<{ itemId: string }>()
  const { h2, h3, p } = { ...theme.typography.fontSize }

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const getItemInfo = (itemId: string) => {
    fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/item?id=${itemId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        const info: ItemListing = res.message
        setItemInfo(info)
      })
      .catch((err) => console.error(err))
  }

  const getOwnerData = (firebaseUID: string) => {
    fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/user?user=${firebaseUID}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        return resp.json()
      })
      .then((res) => {
        const userData: UserData = res.message
        setOwnerInfo(userData)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getItemInfo(params.itemId!)
  }, [])

  useEffect(() => {
    console.log(itemInfo)
    itemInfo?.currentOwner && getOwnerData(itemInfo.currentOwner)
  }, [itemInfo])

  const chatOnClick = () => {
    navigate(`${PATHS.CHAT}/${ownerInfo?.firebaseUID}`)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledDealPage>
      {itemInfo && (
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
      )}
    </StyledDealPage>
  )
}

export default DealPage
