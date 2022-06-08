import ChatApplet from '../../../components/marketplace/ChatApplet/ChatApplet'
import ChatTab from '../../../components/marketplace/ChatDrawer/ChatTab'
import {
  ChatInterfaceDiv,
  ChatsDrawerDiv,
  ChatsDrawerHeader,
  StyledChatPage,
} from './styles/ChatPage.styled'

// Chat Page and Chat Components created with reference to https://www.youtube.com/watch?v=zQyrwxMPm88
const ChatPage = () => {
  return (
    <StyledChatPage>
      <ChatsDrawerDiv>
        <ChatsDrawerHeader>Chats</ChatsDrawerHeader>
        {['b', 'n', 'g', 'o'].map((c) => {
          return <ChatTab id={c} />
        })}
      </ChatsDrawerDiv>
      <ChatInterfaceDiv>
        <ChatApplet />
      </ChatInterfaceDiv>
    </StyledChatPage>
  )
}

export default ChatPage
