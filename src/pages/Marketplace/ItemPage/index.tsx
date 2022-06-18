import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'
// import { getItemInfo } from '../../../store/marketplace/actions'
import { ItemListing } from '../../../store/marketplace/types'

import Button from '../../../components/common/Button/Button'

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
} from './styles/ItemPage.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import catanSet from '../../../assets/catan-set.jpg'
import saleBannerPic from '../../../assets/trade.png'
import rentBannerPic from '../../../assets/rent.png'
import { UserData } from '../../../store/authentication/types'

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
  const params = useParams<{ itemId: string }>()
  const { h1, h2, h3, p } = { ...theme.typography.fontSize }

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const tags = [
    'tags',
    'tangs',
    'tang',
    'tango',
    'tanky',
    'tankyy',
    'tankyyy',
    'tankyyyy',
    'tankyyyy',
    'tankyyyy',
    'tankyyyy',
  ]

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
    itemInfo?.currentOwner && getOwnerData(itemInfo.currentOwner)
  }, [itemInfo])

  const chatOnClick = () => {
    navigate(`${PATHS.CHAT}`)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledItemPage>
      {itemInfo ? (
        <>
          <LeftDiv>
            <TypeBannerDiv>
              <TypeBannerPic src={saleBannerPic} />
              <TypeBannerText>{itemInfo.typeOfTransaction}</TypeBannerText>
            </TypeBannerDiv>
            <ItemShowcaseDiv>
              <ItemPicture src={itemInfo.imageURL ?? catanSet} />
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
            <ItemName fontType={h2}>{itemInfo.name}</ItemName>
            <PriceTag fontType={h1}>$26.46</PriceTag>
            <DescriptionDiv fontType={p}>{itemInfo.description}</DescriptionDiv>
            <DealInfoDiv fontType={p}>
              <Subheader fontType={h2}>Deal Information</Subheader>
              <DescriptionDiv fontType={p}>{itemInfo.deliveryInformation}</DescriptionDiv>
            </DealInfoDiv>
            <ItemConditionSpan>
              <Subheader fontType={h2}>Item Condition:&nbsp;</Subheader>
              <DescriptionDiv fontType={p}>Very Good</DescriptionDiv>
            </ItemConditionSpan>
            <TagsDiv>
              <Subheader fontType={h2}>Tags</Subheader>
              <TagsContainer>
                {itemInfo.tags.map((tag, index) => (
                  <Tag key={index} label={tag} />
                ))}
              </TagsContainer>
            </TagsDiv>
            <Button
              style={{
                marginTop: '24px',
                borderRadius: '0',
              }}
              text="Make An Offer"
              onClick={dealOnClick}
            />
          </InfoDiv>
        </>
      ) : (
        <h1>Item Not Found</h1>
      )}
    </StyledItemPage>
  )
}

export default ItemPage
