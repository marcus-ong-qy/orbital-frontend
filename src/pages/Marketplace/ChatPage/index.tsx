import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { auth, database, getUserFirebaseProfile } from '../../../firebase'
import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'

import ChatApplet from '../../../components/marketplace/ChatApplet/ChatApplet'
import ChatTab from '../../../components/marketplace/ChatDrawer/ChatTab'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  ChatInterfaceDiv,
  ChatsDrawerDiv,
  ChatsDrawerHeader,
  StyledChatPage,
} from './styles/ChatPage.styled'
import { PATHS } from '../../../routes/PATHS'

// Chat Page and Chat Components created with reference to https://www.youtube.com/watch?v=zQyrwxMPm88
const ChatPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { h1 } = { ...theme.typography.fontSize }
  const { isLoading } = useAppSelector((state) => state.auth_reducer)

  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userChatsUID, setUserChatsUID] = useState<string[]>()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !isLoggedIn) {
        setUserFirebaseProfile(getUserFirebaseProfile(user))
        setIsLoggedIn(true)
      } else if (!user && isLoggedIn) {
        setUserFirebaseProfile(defaultUserFirebaseProfile)
        setIsLoggedIn(false)
      }
    })
  })

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
