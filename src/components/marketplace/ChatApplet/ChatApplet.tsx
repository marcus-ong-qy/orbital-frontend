import { useEffect, useState } from 'react'
import { onValue, ref, set } from 'firebase/database'
import { useTheme } from 'styled-components'

import { auth, database } from '../../../firebase'

import { UserData } from '../../../store/authentication/types'
import { ItemListing, Message } from '../../../store/marketplace/types'

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

const ChatApplet = ({
  ownerInfo,
  selectedItemData,
  chatUID,
}: {
  ownerInfo: UserData | null
  selectedItemData: ItemListing
  chatUID: string
}) => {
  const theme = useTheme()
  const { h1, h2, h3 } = { ...theme.typography.fontSize }

  const [messages, setMessages] = useState<Message[] | null>(null)
  const [formValue, setFormValue] = useState('')

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

  const renderChatProductBannerDiv = () => (
    <ChatProductBannerDiv
    // onClick={() => navigate(`${PATHS.CHAT}/${selectedItemData._id}`)} // TODO back end returns _id: {}
    >
      <div>
        <ProductTitle fontType={h2}>{selectedItemData.name}</ProductTitle>
        <ProductInfo fontType={h3}>
          {selectedItemData?.typeOfTransaction} for{' '}
          <PriceHighlight>${selectedItemData.price}</PriceHighlight>
          {selectedItemData?.typeOfTransaction === 'RENT' && (
            <PerDayHighlight>/day</PerDayHighlight>
          )}
        </ProductInfo>
      </div>
      <ProductPic
        src={selectedItemData?.imageURL[0] ? selectedItemData?.imageURL[0] : defaultPic}
      />
    </ChatProductBannerDiv>
  )

  return (
    <ChatAppletDiv>
      <ChatAppletHeaderDiv>
        <ProfilePic
          src={ownerInfo?.imageURL?.length ? ownerInfo.imageURL : defaultAvatar}
          diameter="55px"
          round
        />
        <ReceipientUsername fontType={h1}>
          {ownerInfo?.username?.length ? ownerInfo.username : ownerInfo?.name}
        </ReceipientUsername>
      </ChatAppletHeaderDiv>

      {selectedItemData && renderChatProductBannerDiv()}

      <ChatMessagesDiv id="chat-message-div">
        {messages?.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </ChatMessagesDiv>

      <MessageForm onSubmit={sendMessage}>
        <MessageInput
          id="message-input"
          value={formValue}
          onChange={onChange}
          placeholder="Write a message to"
        />
        <PictureIcon src={picIcon} />
        <SendButton type="submit" disabled={!formValue}>
          <SendIcon src={sendIcon} />
        </SendButton>
      </MessageForm>
    </ChatAppletDiv>
  )
}

export default ChatApplet
