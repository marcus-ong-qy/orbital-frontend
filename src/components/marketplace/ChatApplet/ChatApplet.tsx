import { useEffect, useRef, useState } from 'react'
import { auth, database } from '../../../firebase'
import { theme } from '../../../styles/Theme'
import ChatMessage from '../ChatMessage/ChatMessage'

import {
  ChatAppletDiv,
  ChatAppletHeaderDiv,
  ChatMessagesDiv,
  ChatProductBannerDiv,
  MessageForm,
  MessageInput,
  PictureIcon,
  ProductInfo,
  ProductTitle,
  ProfilePic,
  ReceipientUsername,
  SendButton,
  SendIcon,
} from './styles/ChatApplet.styled'

import catanSet from '../../../assets/catan-set.jpg'
import defaultAvatar from '../../../assets/default_avatar.png'
import picIcon from '../../../assets/picture.png'
import sendIcon from '../../../assets/send.svg'
import { ChatMetadata, Message } from '../../../store/marketplace/types'
import { FirebaseProfile } from '../../../store/authentication/types'
import { useAppSelector } from '../../../app/hooks'
import { onValue, ref, set } from 'firebase/database'

export type Item = {
  id: string
  title: string
  price: number
  type: 'sale' | 'rent'
}

const ChatApplet = ({ user }: { user: FirebaseProfile }) => {
  const dummy = useRef()
  // const messagesRef = firestore.collection('messages')
  // const query = messagesRef.orderBy('createdAt').limit(25)

  const { h1, h2, h3 } = { ...theme.typography.fontSize }

  const { selectedChatData } = useAppSelector((state) => state.marketplace_reducer)

  const isCreator = selectedChatData.createdBy === user.uid
  const receipientUID = isCreator ? selectedChatData.receipient : selectedChatData.createdBy

  const [messages, setMessages] = useState<Message[] | null>(null)
  const [formValue, setFormValue] = useState('')

  useEffect(() => {
    const chatUUID = selectedChatData.id
    if (chatUUID) {
      const messagesRef = ref(database, 'messages/' + chatUUID)

      onValue(messagesRef, (snapshot) => {
        const data: Record<string, Message> = snapshot.val()
        const newMessages = Object.values(data).sort((msg1, msg2) => msg1.sentAt - msg2.sentAt)
        setMessages(newMessages)
      })
    }
  }, [selectedChatData.id])

  // setMessages([
  //   {
  //     id: '2646',
  //     messageText: 'hello',
  //     sentAt: Date.now(),
  //     sentBy: 'Kh45xlC3RPQm0501LB7NihUSEwu1',
  //   },
  //   {
  //     id: '2647',
  //     messageText: 'neigh?',
  //     sentAt: Date.now(),
  //     sentBy: 'wu1wu1wu1wu1wu1wu1wu1wu1',
  //   },
  // ])

  // const [messages] = useCollectionData(query, { idField: 'id' })

  const sendMessage = async (e: any) => {
    e.preventDefault()

    const chatUUID = selectedChatData.id
    const { uid, photoURL } = auth.currentUser! // You must be sign in to access here!

    const messageUUID = crypto.randomUUID()
    const newMessage: Message = {
      id: messageUUID,
      messageText: formValue,
      sentAt: Date.now(),
      sentBy: uid,
    }
    const messagesRef = ref(database, `messages/${chatUUID}/${messageUUID}`)
    const recentMessageRef = ref(database, `chats/${chatUUID}/recentMessage`)

    set(messagesRef, newMessage)
    set(recentMessageRef, newMessage)

    setFormValue('')
    // dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value)
  }

  return (
    <ChatAppletDiv>
      <ChatAppletHeaderDiv>
        <ProfilePic src={defaultAvatar} />
        <ReceipientUsername fontType={h1}>{receipientUID}</ReceipientUsername>
      </ChatAppletHeaderDiv>
      <ChatProductBannerDiv>
        <ProductTitle fontType={h2}>{selectedChatData.itemListing}</ProductTitle>
        <ProductInfo fontType={h3}>Buy for $2646</ProductInfo>
      </ChatProductBannerDiv>
      <ChatMessagesDiv>
        {messages?.map((msg) => (
          <ChatMessage message={msg} />
        ))}
        {/* <span ref={dummy}/> */}
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
