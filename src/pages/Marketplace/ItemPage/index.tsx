import { useNavigate, useParams } from 'react-router-dom'
import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'

import {
  BottomDiv,
  ChatButton,
  DealButton,
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
  PriceTag,
  StyledItemPage,
  Subheader,
  TagDiv,
  TagsDiv,
  TagsSpan,
} from './styles/ItemPage.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import catanSet from '../../../assets/catan-set.jpg'

const Tag = ({ label }: { label: string }) => {
  const { h2 } = { ...theme.typography.fontSize }

  const onClick = () => {
    // TODO
    console.log(label)
  }

  return (
    <TagDiv id={crypto.randomUUID()} fontType={h2} onClick={onClick}>
      {label}
    </TagDiv>
  )
}

const ItemPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ itemId: string }>()
  const { h2, p } = { ...theme.typography.fontSize }

  const tags = ['tags', 'tangs', 'tang', 'tango', 'tankyyyy']

  const chatOnClick = () => {
    navigate(PATHS.CHAT)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledItemPage>
      <LeftDiv>
        <ItemShowcaseDiv>
          <ItemPicture src={catanSet} />
        </ItemShowcaseDiv>
        <BottomDiv>
          listed by:
          <OwnerDiv>
            <ProfilePic src={defaultAvatar} diameter="55px" />
            <OwnerName>happyhorse</OwnerName>
            <ChatButton text="🗨️ Chat" onClick={chatOnClick} />
          </OwnerDiv>
        </BottomDiv>
      </LeftDiv>
      <InfoDiv>
        <ItemName fontType={h2}>
          CATAN - Trade Build Settle [Brand New] [Limited Edition] [blablabla]
        </ItemName>
        <PriceTag fontType={h2}>$26.46</PriceTag>
        <DescriptionDiv>
          Catan, previously known as The Settlers of Catan or simply Settlers, is a multiplayer
          board game designed by Klaus Teuber. It was first published in 1995 in Germany by
          Franckh-Kosmos Verlag (Kosmos) as Die Siedler von Catan.
        </DescriptionDiv>
        <DealInfoDiv fontType={p}>
          <Subheader fontType={h2}>Deal Information</Subheader>
        </DealInfoDiv>
        <ItemConditionSpan>
          <Subheader fontType={h2}>Item Condition:</Subheader>
          Very Good
        </ItemConditionSpan>
        <TagsDiv>
          <Subheader fontType={h2}>Tags</Subheader>
          <TagsSpan>
            {tags.map((tag, index) => (
              <Tag key={index} label={tag} />
            ))}
          </TagsSpan>
        </TagsDiv>
        <DealButton text="Deal Now" onClick={dealOnClick} />
      </InfoDiv>
    </StyledItemPage>
  )
}

export default ItemPage
