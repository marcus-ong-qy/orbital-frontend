import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import { useAppSelector } from '../../../app/hooks'
import { database } from '../../../firebase'

import ChatApplet from '../../../components/marketplace/ChatApplet/ChatApplet'
import ChatTab from '../../../components/marketplace/ChatDrawer/ChatTab'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  ChatInterfaceDiv,
  ChatsDrawerDiv,
  ChatsDrawerHeader,
  StyledChatPage,
} from './styles/ChatPage.styled'

// Chat Page and Chat Components created with reference to https://www.youtube.com/watch?v=zQyrwxMPm88
const ChatPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { h1 } = { ...theme.typography.fontSize }
  const { isLoading, isLoggedIn, userFirebaseProfile } = useAppSelector(
    (state) => state.auth_reducer,
  )

  const [userChatsUID, setUserChatsUID] = useState<string[]>()

  // useEffect(() => {
  //   params.userUID && dispatch(setChatUserUID(params.userUID))
  //   console.log('dispatcho', params.userUID)
  // }, [params.userUID])

  useEffect(() => {
    const userUID = userFirebaseProfile.uid
    const userChatsUIDRef = ref(database, 'users/' + userUID + '/chats')

    onValue(userChatsUIDRef, (snapshot) => {
      const data: Record<string, string> = snapshot.val()
      const newUserChatsUID = Object.values(data)
      setUserChatsUID(newUserChatsUID)
      console.log('list of chicks', newUserChatsUID)
    })
  }, [userFirebaseProfile])

  return (
    <StyledChatPage>
      {isLoggedIn ? (
        <>
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <>
              <ChatsDrawerDiv>
                <ChatsDrawerHeader fontType={h1}>Chats</ChatsDrawerHeader>
                {userChatsUID?.map((chatUID, index) => {
                  return <ChatTab key={index} chatUID={chatUID} />
                })}
              </ChatsDrawerDiv>
              <ChatInterfaceDiv>
                <ChatApplet />
              </ChatInterfaceDiv>
            </>
          )}
        </>
      ) : (
        <h1>
          Forbidden: Please&nbsp;
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate(PATHS.LOGIN)}
          >
            Log In
          </span>
        </h1>
      )}
    </StyledChatPage>
  )
}

export default ChatPage
