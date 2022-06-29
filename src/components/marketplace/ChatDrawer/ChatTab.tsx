import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'

import { theme } from '../../../styles/Theme'
import { auth, database, functions } from '../../../firebase'
import { useAppDispatch } from '../../../app/hooks'
import { setSelectedChatData } from '../../../store/marketplace/actions'
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
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../routes/PATHS'
import { httpsCallable } from 'firebase/functions'
import { setIsLoading } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'

const ChatTab = ({ chatUID }: { chatUID: string }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { h3, p } = { ...theme.typography.fontSize }

  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)

  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const user = auth.currentUser!
  const isCreator = chatMetadata?.createdBy === user.uid
  const receipientUID = isCreator ? chatMetadata?.receipient : chatMetadata?.createdBy

  const getItemInfo = async (itemId: string) => {
    try {
      const getItemById = httpsCallable(functions, 'getItemById')
      const result = (await getItemById({ id: itemId })) as any
      const success = result.data.sucess as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("get item info don't success")
      }
      console.log(result)
      const info: ItemListing = result.data.message._doc
      setItemInfo(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    }
  }

  const getOwnerData = async (firebaseUID: string) => {
    try {
      const getAnotherUserInfo = httpsCallable(functions, 'getAnotherUserInfo')
      const result = (await getAnotherUserInfo({ uid: firebaseUID })) as any
      const success = result.data.success as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log('owner data', result)
        throw new Error("get owner data don't success")
      }
      console.log('owner data', result)
      const info: UserData = result.data.message._doc
      setOwnerInfo(info)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    }
  }

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    onValue(userChatRef, (snapshot) => {
      const chatData: ChatMetadata = snapshot.val()
      setChatMetadata(chatData)
    })
  }, [chatUID])

  useEffect(() => {
    chatMetadata?.itemListing && getItemInfo(chatMetadata.itemListing)
  }, [chatMetadata])

  useEffect(() => {
    receipientUID && getOwnerData(receipientUID)
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
