import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
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
import { database } from '../../../firebase'
import { ChatMetadata } from '../../../store/marketplace/types'

const ChatTab = ({ chatUID }: { chatUID: string }) => {
  const { h3, p } = { ...theme.typography.fontSize }

  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    onValue(userChatRef, (snapshot) => {
      const newChatMetadata: ChatMetadata = snapshot.val()
      setChatMetadata(newChatMetadata)
    })
  })

  return (
    <ChatTabDiv id={chatUID}>
      <ProfilePic src={defaultAvatar} />
      <ChatInfoDiv>
        <ChatUsername fontType={h3}>{chatMetadata?.receipient}</ChatUsername>
        <ChatPreview fontType={p}>{chatMetadata?.recentMessage?.messageText}</ChatPreview>
        <ItemInfo fontType={h3}>{chatMetadata?.itemListing}</ItemInfo>
      </ChatInfoDiv>
      <ProductPic src={catanSet} />
    </ChatTabDiv>
  )
}

export default ChatTab
