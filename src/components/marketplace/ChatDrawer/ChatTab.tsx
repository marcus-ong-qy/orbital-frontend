import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'

import { theme } from '../../../styles/Theme'
import { auth, database } from '../../../firebase'
import { useAppDispatch } from '../../../app/hooks'
import { setSelectedChatData } from '../../../store/marketplace/actions'
import { ChatMetadata } from '../../../store/marketplace/types'

import {
  ChatInfoDiv,
  ChatPreview,
  ChatTabDiv,
  ChatUsername,
  ItemInfo,
  ProductPic,
} from './styles/ChatTab.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultPic from '../../../assets/picture.png'
import defaultAvatar from '../../../assets/default_avatar.png'

const ChatTab = ({ chatUID }: { chatUID: string }) => {
  const dispatch = useAppDispatch()
  const { h3, p } = { ...theme.typography.fontSize }

  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)

  const user = auth.currentUser!
  const isCreator = chatMetadata?.createdBy === user.uid
  const receipientUID = isCreator ? chatMetadata?.receipient : chatMetadata?.createdBy

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    onValue(userChatRef, (snapshot) => {
      const newChatMetadata: ChatMetadata = snapshot.val()
      setChatMetadata(newChatMetadata)
    })
  }, [chatUID])

  const onClick = () => {
    chatMetadata && dispatch(setSelectedChatData(chatMetadata))
  }

  return (
    <ChatTabDiv key={chatUID} onClick={onClick}>
      <ProfilePic src={defaultAvatar} diameter="clamp(30px, 6vw, 78px)" round />
      <ChatInfoDiv>
        <ChatUsername fontType={h3}>{receipientUID}</ChatUsername>
        <ChatPreview fontType={p}>{chatMetadata?.recentMessage?.messageText}</ChatPreview>
        <ItemInfo fontType={h3}>{chatMetadata?.itemListing}</ItemInfo>
      </ChatInfoDiv>
      <ProductPic src={defaultPic} />
    </ChatTabDiv>
  )
}

export default ChatTab
