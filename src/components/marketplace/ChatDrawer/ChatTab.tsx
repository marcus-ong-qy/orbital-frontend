import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { useTheme } from 'styled-components'
import { httpsCallable } from 'firebase/functions'

import { useAppDispatch } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { auth, database } from '../../../firebase'

import { getAnotherUserInfo } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'
import { ChatMetadata, ItemListing } from '../../../store/marketplace/types'

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
  const theme = useTheme()
  const navigate = useNavigate()
  const { h3, p } = { ...theme.typography.fontSize }

  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const user = auth.currentUser!
  const isCreator = chatMetadata?.createdBy === user.uid
  const receipientUID = isCreator ? chatMetadata?.receipient : chatMetadata?.createdBy

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    onValue(userChatRef, (snapshot) => {
      const chatData: ChatMetadata = snapshot.val()
      setChatMetadata(chatData)
    })
  }, [chatUID])

  useEffect(() => {
    chatMetadata?.itemListing && dispatch(getItemById(chatMetadata.itemListing, setItemInfo))
  }, [chatMetadata])

  useEffect(() => {
    receipientUID && dispatch(getAnotherUserInfo(receipientUID, setOwnerInfo))
  }, [chatMetadata])

  const onClick = () => {
    navigate(`${PATHS.CHAT}/${chatUID}`)
  }

  return (
    <ChatTabDiv key={chatUID} onClick={onClick}>
      <ProfilePic src={defaultAvatar} diameter="clamp(30px, 6vw, 78px)" round />
      <ChatInfoDiv>
        <ChatUsername fontType={h3}>
          {ownerInfo?.username.length ? ownerInfo.username : ownerInfo?.name}
        </ChatUsername>
        <ChatPreview fontType={p}>{chatMetadata?.recentMessage?.messageText}</ChatPreview>
        <ItemInfo fontType={h3}>{itemInfo?.name}</ItemInfo>
      </ChatInfoDiv>
      <ProductPic src={itemInfo?.imageURL ? itemInfo?.imageURL : defaultPic} />
    </ChatTabDiv>
  )
}

export default ChatTab
