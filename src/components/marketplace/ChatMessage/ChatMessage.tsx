import { auth } from '../../../firebase'
import { Message } from '../../../store/marketplace/types'

import { ProfilePic } from '../../../styles/index.styled'
import { ChatBubble, ChatMessageDiv } from './styles/ChatMessage.styled'

import defaultAvatar from '../../../assets/default_avatar.png'

const ChatMessage = ({ message }: { message: Message }) => {
  const { id, messageText, sentAt, sentBy } = message

  const messageType = sentBy === auth.currentUser?.uid ? 'sent' : 'received'

  return (
    <ChatMessageDiv key={id} messageType={messageType}>
      {messageType === 'sent' ? (
        <>
          <ChatBubble messageType={messageType}>{messageText}</ChatBubble>
          <ProfilePic src={defaultAvatar} diameter="35px" round />
        </>
      ) : (
        <>
          <ProfilePic src={defaultAvatar} diameter="35px" round />
          <ChatBubble messageType={messageType}>{messageText}</ChatBubble>
        </>
      )}
    </ChatMessageDiv>
  )
}

export default ChatMessage
