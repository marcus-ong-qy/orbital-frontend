import { auth } from '../../../firebase'
import { ChatBubble, ChatMessageDiv, ProfilePic } from './styles/ChatMessage.styled'

import defaultAvatar from '../../../assets/default_avatar.png'
import { Message } from '../../../store/marketplace/types'

const ChatMessage = ({ message }: { message: Message }) => {
  const { id, messageText, sentAt, sentBy } = message

  const messageType = sentBy === auth.currentUser?.uid ? 'sent' : 'received'

  return (
    <ChatMessageDiv id={id} messageType={messageType}>
      {messageType === 'sent' ? (
        <>
          <ChatBubble messageType={messageType}>{messageText}</ChatBubble>
          <ProfilePic src={defaultAvatar} />
        </>
      ) : (
        <>
          <ProfilePic src={defaultAvatar} />
          <ChatBubble messageType={messageType}>{messageText}</ChatBubble>
        </>
      )}
    </ChatMessageDiv>
  )
}

export default ChatMessage
