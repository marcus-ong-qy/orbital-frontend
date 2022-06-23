import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'

import { theme } from '../../../styles/Theme'
import { auth, database, getUserFirebaseProfile } from '../../../firebase'
import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'

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
  const { h1 } = { ...theme.typography.fontSize }

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

  useEffect(() => {
    const userUID = userFirebaseProfile.uid
    const userChatsUIDRef = ref(database, 'users/' + userUID + '/chats')

    onValue(userChatsUIDRef, (snapshot) => {
      const data: string[] = snapshot.val()
      const newUserChatsUID = data
      setUserChatsUID(newUserChatsUID)
    })
  }, [userFirebaseProfile.uid])

  return (
    <StyledChatPage>
      <ChatsDrawerDiv>
        <ChatsDrawerHeader fontType={h1}>Chats</ChatsDrawerHeader>
        {userChatsUID?.map((chatUID, index) => {
          return <ChatTab key={index} chatUID={chatUID} />
        })}
      </ChatsDrawerDiv>
      <ChatInterfaceDiv>
        <ChatApplet user={userFirebaseProfile} />
      </ChatInterfaceDiv>
    </StyledChatPage>
  )
}

export default ChatPage
