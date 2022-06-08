import { auth } from '../../../firebase'
import { ChatBubble, ChatMessageDiv, ProfilePic } from './styles/ChatMessage.styled'

import defaultAvatar from '../../../assets/default_avatar.png'

export type Message = {
  key: string
  text: string
  uid: string
  profilePic?: string
}

const ChatMessage = ({ message }: { message: Message }) => {
  const { key, text, uid, profilePic } = message

  const messageType = uid === auth.currentUser?.uid ? 'sent' : 'received'

  return (
    <ChatMessageDiv id={key} messageType={messageType}>
      {messageType === 'sent' ? (
        <>
          <ChatBubble messageType={messageType}>{text}</ChatBubble>
          <ProfilePic src={profilePic || defaultAvatar} />
        </>
      ) : (
        <>
          <ProfilePic src={profilePic || defaultAvatar} />
          <ChatBubble messageType={messageType}>{text}</ChatBubble>
        </>
      )}
    </ChatMessageDiv>
  )
}

export default ChatMessage
