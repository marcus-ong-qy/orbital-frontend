import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onValue, ref, set } from 'firebase/database'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { auth, database, functions } from '../../../firebase'

import { getAnotherUserInfo } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById, setChatUID } from '../../../store/marketplace/actions'
import { ChatMetadata, ItemListing, Message } from '../../../store/marketplace/types'

import ChatMessage from '../ChatMessage/ChatMessage'

import {
  ChatAppletDiv,
  ChatAppletHeaderDiv,
  ChatMessagesDiv,
  ChatProductBannerDiv,
  MessageForm,
  MessageInput,
  PerDayHighlight,
  PictureIcon,
  PriceHighlight,
  ProductInfo,
  ProductPic,
  ProductTitle,
  ReceipientUsername,
  SendButton,
  SendIcon,
} from './styles/ChatApplet.styled'
import { ProfilePic } from '../../../styles/index.styled'

import defaultPic from '../../../assets/picture.png'
import defaultAvatar from '../../../assets/default_avatar.png'
import picIcon from '../../../assets/picture.png'
import sendIcon from '../../../assets/send.svg'

export type Item = {
  id: string
  title: string
  price: number
  type: 'sale' | 'rent'
}

const ChatApplet = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams<{ chatUID: string }>()
  const { h1, h2, h3 } = { ...theme.typography.fontSize }
  const {
    // selectedChatData,
    chatUID,
  } = useAppSelector((state) => state.marketplace_reducer)

  // const isCreator = selectedChatData.createdBy === user.uid
  // const receipientUID = isCreator ? selectedChatData.receipient : selectedChatData.createdBy

  const [messages, setMessages] = useState<Message[] | null>(null)
  const [formValue, setFormValue] = useState('')

  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)
  const [itemInfo, setItemInfo] = useState<ItemListing | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const user = auth.currentUser
  const isCreator = chatMetadata?.createdBy === user?.uid
  const receipientUID = isCreator ? chatMetadata?.receipient : chatMetadata?.createdBy

  useEffect(() => {
    // TODO might be redundant
    params.chatUID && dispatch(setChatUID(params.chatUID))
  }, [params.chatUID])

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    onValue(userChatRef, (snapshot) => {
      const chatData: ChatMetadata = snapshot.val()
      // chatData && dispatch(setSelectedChatData(chatData))
      setChatMetadata(chatData)
      console.log('chat metadata', chatData)
    })
  }, [chatUID])

  useEffect(() => {
    chatMetadata?.itemListing && dispatch(getItemById(chatMetadata.itemListing, setItemInfo))
  }, [chatMetadata])

  useEffect(() => {
    receipientUID && dispatch(getAnotherUserInfo(receipientUID, setOwnerInfo))
  }, [chatMetadata])

  useEffect(() => {
    if (chatUID) {
      const messagesRef = ref(database, 'messages/' + chatUID)

      onValue(messagesRef, (snapshot) => {
        const data: Record<string, Message> = snapshot.val()
        const newMessages = Object.values(data).sort((msg1, msg2) => msg1.sentAt - msg2.sentAt)
        setMessages(newMessages)
      })
    }
  }, [chatUID])

  // const [itemListing, setItemListing] = useState<ItemListing | null>(null)

  useEffect(() => {
    // getItemListing(params.itemId!) // TODO
  }, [])

  useEffect(() => {
    const messageDiv = document.getElementById('chat-message-div')
    if (messageDiv) messageDiv.scrollTop = messageDiv.scrollHeight
  })

  const sendMessage = async (e: any) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser! // You must be sign in to access here!

    const messageUUID = crypto.randomUUID()
    const newMessage: Message = {
      id: messageUUID,
      messageText: formValue,
      sentAt: Date.now(),
      sentBy: uid,
    }
    const messagesRef = ref(database, `messages/${chatUID}/${messageUUID}`)
    const recentMessageRef = ref(database, `chats/${chatUID}/recentMessage`)

    set(messagesRef, newMessage)
    set(recentMessageRef, newMessage)

    setFormValue('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value)
  }

  return (
    <ChatAppletDiv>
      <ChatAppletHeaderDiv>
        <ProfilePic src={defaultAvatar} diameter="55px" round />
        <ReceipientUsername fontType={h1}>
          {ownerInfo?.username.length ? ownerInfo.username : ownerInfo?.name}
        </ReceipientUsername>
      </ChatAppletHeaderDiv>

      {itemInfo && (
        <ChatProductBannerDiv
        // onClick={() => navigate(`${PATHS.CHAT}/${itemInfo._id}`)} // TODO back end returns _id: {}
        >
          <div>
            <ProductTitle fontType={h2}>{itemInfo.name}</ProductTitle>
            <ProductInfo fontType={h3}>
              {itemInfo?.typeOfTransaction} for <PriceHighlight>${itemInfo.price}</PriceHighlight>
              {itemInfo?.typeOfTransaction === 'Rent' && <PerDayHighlight>/day</PerDayHighlight>}
            </ProductInfo>
          </div>
          <ProductPic src={itemInfo?.imageURL ? itemInfo?.imageURL : defaultPic} />
        </ChatProductBannerDiv>
      )}

      <ChatMessagesDiv id="chat-message-div">
        {messages?.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </ChatMessagesDiv>

      <MessageForm onSubmit={sendMessage}>
        <MessageInput value={formValue} onChange={onChange} placeholder={'Write a message to'} />
        <PictureIcon src={picIcon} />
        <SendButton type="submit" disabled={!formValue}>
          <SendIcon src={sendIcon} />
        </SendButton>
      </MessageForm>
    </ChatAppletDiv>
  )
}

export default ChatApplet
