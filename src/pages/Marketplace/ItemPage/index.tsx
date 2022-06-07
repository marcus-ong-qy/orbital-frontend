import { useNavigate } from 'react-router-dom'
import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'

import {
  DealButton,
  DealInfoDiv,
  DescriptionDiv,
  InfoDiv,
  ItemConditionSpan,
  ItemName,
  ItemPicture,
  ItemShowcaseDiv,
  OwnerSpan,
  PriceTag,
  StyledItemPage,
  Subheader,
  Tag,
  TagsDiv,
  TagsSpan,
} from './styles/ItemPage.styled'

import catanSet from '../../../assets/catan-set.jpg'

const ItemPage = () => {
  const navigate = useNavigate()
  const { h2, p } = { ...theme.typography.fontSize }

  const dealOnClick = () => {
    navigate(PATHS.CHAT)
  }
  return (
    <StyledItemPage>
      <ItemShowcaseDiv>
        <ItemPicture src={catanSet} />
      </ItemShowcaseDiv>
      <InfoDiv>
        <ItemName fontType={h2}>
          CATAN - Trade Build Settle [Brand New] [Limited Edition] [blablabla]
        </ItemName>
        <PriceTag fontType={h2}>$26.46</PriceTag>
        <DescriptionDiv>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
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
            <Tag fontType={h2}>tag</Tag>
            <Tag fontType={h2}>tag</Tag>
            <Tag fontType={h2}>tag</Tag>
            <Tag fontType={h2}>tag</Tag>
          </TagsSpan>
        </TagsDiv>
        <OwnerSpan></OwnerSpan>
        <DealButton text="Deal Now" onClick={dealOnClick} />
      </InfoDiv>
    </StyledItemPage>
  )
}

export default ItemPage
