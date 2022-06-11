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
import { onValue, ref } from 'firebase/database'

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

  const { chatData } = useAppSelector((state) => state.marketplace_reducer)

  const isCreator = chatData.createdBy === user.uid
  const receipient = isCreator ? chatData.receipient : chatData.createdBy

  const [messages, setMessages] = useState<Message[] | null>(null)

  useEffect(() => {
    const chatUUID = chatData.id
    const userChatsUIDRef = ref(database, 'messages/' + chatUUID)

    onValue(userChatsUIDRef, (snapshot) => {
      const data: Record<string, Message> = snapshot.val()
      const newMessages = Object.values(data).sort((msg1, msg2) => msg2.sentAt - msg1.sentAt)
      setMessages(newMessages)
    })
  })

  // const mockmessages: Message[] = [
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
  // ]

  // const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e: any) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser! // You must be sign in to access here!

    // await messagesRef.add({
    //   text: formValue,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   uid,
    //   photoURL,
    // })

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
        <ReceipientUsername fontType={h1}>ReceipientUsername</ReceipientUsername>
      </ChatAppletHeaderDiv>
      <ChatProductBannerDiv>
        <ProductTitle fontType={h2}>{chatData.itemListing}</ProductTitle>
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
