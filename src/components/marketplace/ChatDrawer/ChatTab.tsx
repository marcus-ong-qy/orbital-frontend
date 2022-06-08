import { theme } from '../../../styles/Theme'

import {
  ChatInfoDiv,
  ChatPreview,
  ChatTabDiv,
  ChatUsername,
  ItemInfo,
  ProductPic,
  ProfilePic,
} from './styles/ChatTab.styled'

import catanSet from '../../../assets/catan-set.jpg'
import defaultAvatar from '../../../assets/default_avatar.png'

const ChatTab = ({ id }: { id: string }) => {
  const { h3, p } = { ...theme.typography.fontSize }
  return (
    <ChatTabDiv id={id}>
      <ProfilePic src={defaultAvatar} />
      <ChatInfoDiv>
        <ChatUsername fontType={h3}>ChatUsername</ChatUsername>
        <ChatPreview fontType={p}>ChatPreview</ChatPreview>
        <ItemInfo fontType={h3}>ItemInfo</ItemInfo>
      </ChatInfoDiv>
      <ProductPic src={catanSet} />
    </ChatTabDiv>
  )
}

export default ChatTab
