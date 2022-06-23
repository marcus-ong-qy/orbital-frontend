import { useEffect, useRef, useState } from 'react'
import { onValue, ref, set } from 'firebase/database'

import { useAppSelector } from '../../../app/hooks'
import { auth, database } from '../../../firebase'
import { theme } from '../../../styles/Theme'
import ChatMessage from '../ChatMessage/ChatMessage'

import { ChatMetadata, ItemListing, Message } from '../../../store/marketplace/types'
import { FirebaseProfile } from '../../../store/authentication/types'

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

  const [itemListing, setItemListing] = useState<ItemListing | null>(null)

  const getItemListing = (itemId: string) => {
    fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/item?id=${itemId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        const info: ItemListing = res.message
        setItemListing(info)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    // getItemListing(params.itemId!) // TODO
  }, [])

  useEffect(() => {
    const messageDiv = document.getElementById('chat-message-div')
    if (messageDiv) messageDiv.scrollTop = messageDiv.scrollHeight
  })

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
        <ProfilePic src={defaultAvatar} diameter="55px" round />
        <ReceipientUsername fontType={h1}>{'{receipientUID}'}</ReceipientUsername>
      </ChatAppletHeaderDiv>

      {'itemListing' && (
        <ChatProductBannerDiv>
          <div>
            <ProductTitle fontType={h2}>{'{selectedChatData.itemListing}'}</ProductTitle>
            <ProductInfo fontType={h3}>
              {'{itemListing.typeOfTransaction}'} for{' '}
              <PriceHighlight>${'{itemListing.price}'}</PriceHighlight>
              {"itemListing.typeOfTransaction === 'Rent'" && (
                <PerDayHighlight>/day</PerDayHighlight>
              )}
            </ProductInfo>
          </div>
          <ProductPic src={catanSet} />
        </ChatProductBannerDiv>
      )}

      <ChatMessagesDiv id="chat-message-div">
        {messages?.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
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
