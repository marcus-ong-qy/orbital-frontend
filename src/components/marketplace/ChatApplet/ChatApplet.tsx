import { useRef, useState } from 'react'
import { auth } from '../../../firebase'
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

export type Item = {
  id: string
  title: string
  price: number
  type: 'sale' | 'rent'
}

const ChatApplet = () =>
  // { item }: { item: Item }
  {
    const dummy = useRef()
    // const messagesRef = firestore.collection('messages')
    // const query = messagesRef.orderBy('createdAt').limit(25)

    const { h1, h2, h3 } = { ...theme.typography.fontSize }

    const [messages] = [
      [
        {
          key: 'string',
          text: 'string',
          uid: 'string',
          profilePic: '',
        },
        {
          key: 'string2',
          text: 'stringstring',
          uid: 'stringstring',
          profilePic: '',
        },
      ],
    ]
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
          <ProductTitle fontType={h2}>Catan bla</ProductTitle>
          <ProductInfo fontType={h3}>Buy for $2646</ProductInfo>
        </ChatProductBannerDiv>
        <ChatMessagesDiv>
          {messages && messages.map((msg) => <ChatMessage message={msg} />)}

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
