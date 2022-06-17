import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'
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

  // const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)

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

  // useEffect(() => {
  //   // TODO api GET by itemId and parse to state
  // }, [])

  const chatOnClick = () => {
    navigate(PATHS.CHAT)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledItemPage>
      <LeftDiv>
        <TypeBannerDiv>
          <TypeBannerPic src={saleBannerPic} />
          <TypeBannerText>Sale</TypeBannerText>
        </TypeBannerDiv>
        <ItemShowcaseDiv>
          <ItemPicture src={catanSet} />
        </ItemShowcaseDiv>
        <BottomDiv>
          <BottomDivTitle fontType={h3}>listed by:</BottomDivTitle>
          <OwnerDiv>
            <OwnerSubDiv>
              <ProfilePic src={defaultAvatar} diameter="55px" round />
              <OwnerName fontType={h3}>happyhorse</OwnerName>
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
        <ItemName fontType={h2}>
          CATAN - Trade Build Settle [Brand New] [Limited Edition] [blablabla]
        </ItemName>
        <PriceTag fontType={h1}>$26.46</PriceTag>
        <DescriptionDiv fontType={p}>
          Catan, previously known as The Settlers of Catan or simply Settlers, is a multiplayer
          board game designed by Klaus Teuber. It was first published in 1995 in Germany by
          Franckh-Kosmos Verlag (Kosmos) as Die Siedler von Catan.
        </DescriptionDiv>
        <DealInfoDiv fontType={p}>
          <Subheader fontType={h2}>Deal Information</Subheader>
          <DescriptionDiv fontType={p}>
            Location: Tampines MRT <br />
            Transaction method: Cash
          </DescriptionDiv>
        </DealInfoDiv>
        <ItemConditionSpan>
          <Subheader fontType={h2}>Item Condition:&nbsp;</Subheader>
          <DescriptionDiv fontType={p}>Very Good</DescriptionDiv>
        </ItemConditionSpan>
        <TagsDiv>
          <Subheader fontType={h2}>Tags</Subheader>
          <TagsContainer>
            {tags.map((tag, index) => (
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
    </StyledItemPage>
  )
}

export default ItemPage
