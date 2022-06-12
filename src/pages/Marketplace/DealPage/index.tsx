import { useNavigate, useParams } from 'react-router-dom'
import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'

import {
  BottomDiv,
  ChatButton,
  DealButton,
  DealInfoDiv,
  DealSummaryCard,
  InfoDiv,
  InfoRowDiv,
  InfoRowTitle,
  InfoRowValue,
  ItemPicture,
  ItemShowcaseDiv,
  LeftDiv,
  OwnerDiv,
  OwnerName,
  StyledDealPage,
  Subheader,
} from './styles/DealPage.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import catanSet from '../../../assets/catan-set.jpg'
import { TEXTS } from '../../../common/texts'

const InfoRow = ({ title, content }: { title: string; content: string }) => {
  return (
    <InfoRowDiv>
      <InfoRowTitle>{title}</InfoRowTitle>:&nbsp;
      <InfoRowValue>{content}</InfoRowValue>
    </InfoRowDiv>
  )
}

const DealPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ itemId: string }>()
  const { h2, p } = { ...theme.typography.fontSize }

  const chatOnClick = () => {
    navigate(PATHS.CHAT)
  }

  const dealOnClick = () => {
    navigate(`${PATHS.DEAL}/${params.itemId}`)
  }

  return (
    <StyledDealPage>
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
        <DealSummaryCard>
          <InfoRow
            title="Item Name"
            content="CATAN - Trade Build Settle [Brand New] [Limited Edition] [blablabla]"
          />
          <InfoRow title="Deal Type" content="Sell" />
          <InfoRow title="Cost" content="$26.46" />
          <DealInfoDiv fontType={p}>
            <Subheader fontType={h2}>Deal Information</Subheader>
          </DealInfoDiv>
        </DealSummaryCard>
        <DealButton text="Confirm Offer" onClick={dealOnClick} />
        <div>
          <b>Disclaimer: </b>
          {TEXTS.DEAL_DISCLAIMER}
        </div>
      </InfoDiv>
    </StyledDealPage>
  )
}

export default DealPage
