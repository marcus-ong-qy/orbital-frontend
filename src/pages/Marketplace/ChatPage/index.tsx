import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import ChatApplet from '../../../components/marketplace/ChatApplet/ChatApplet'
import ChatTab from '../../../components/marketplace/ChatDrawer/ChatTab'
import { auth, database, getUserFirebaseProfile } from '../../../firebase'
import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'
import {
  ChatInterfaceDiv,
  ChatsDrawerDiv,
  ChatsDrawerHeader,
  StyledChatPage,
} from './styles/ChatPage.styled'

// Chat Page and Chat Components created with reference to https://www.youtube.com/watch?v=zQyrwxMPm88
const ChatPage = () => {
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
      const data: Record<number, string> = snapshot.val()
      const newUserChatsUID = []
      for (let i = 0; i < Object.keys(data).length; i++) newUserChatsUID.push(data[i])
      setUserChatsUID(newUserChatsUID)
    })
  })

  return (
    <StyledChatPage>
      <ChatsDrawerDiv>
        <ChatsDrawerHeader>Chats</ChatsDrawerHeader>
        {userChatsUID?.map((chatUID) => {
          return <ChatTab chatUID={chatUID} />
        })}
      </ChatsDrawerDiv>
      <ChatInterfaceDiv>
        <ChatApplet user={userFirebaseProfile} />
      </ChatInterfaceDiv>
    </StyledChatPage>
  )
}

export default ChatPage
