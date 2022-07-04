import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, onValue, ref } from 'firebase/database'
import { useTheme } from 'styled-components'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { auth, database } from '../../../firebase'

import { getAnotherUserInfo } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'
import { ChatMetadata } from '../../../store/marketplace/types'

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
  const dispatch = useAppDispatch()
  const { h1 } = { ...theme.typography.fontSize }
  const { isLoading, isLoggedIn, userFirebaseProfile } = useAppSelector(
    (state) => state.auth_reducer,
  )
  const { selectedItemData } = useAppSelector((state) => state.marketplace_reducer)

  const [userChatsUID, setUserChatsUID] = useState<string[]>()

  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  // useEffect(() => {
  //   params.userUID && dispatch(setChatUserUID(params.userUID))
  //   console.log('dispatcho', params.userUID)
  // }, [params.userUID])

  const user = auth.currentUser
  const isCreator = chatMetadata?.createdBy === user?.uid
  const receipientUID = isCreator ? chatMetadata?.receipient : chatMetadata?.createdBy

  const params = useParams<{ chatUID: string }>()
  const chatUID = params.chatUID

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    get(userChatRef) //TODO put this on chat page
      .then((snapshot) => {
        // alert('triggered')
        const chatData: ChatMetadata = snapshot.val()
        setChatMetadata(chatData)
        console.log('chat metadata', chatData)
      })
  }, [chatUID])

  useEffect(() => {
    chatMetadata?.itemListing && dispatch(getItemById(chatMetadata.itemListing))
    receipientUID && dispatch(getAnotherUserInfo(receipientUID, setOwnerInfo))
  }, [chatMetadata])

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
                <h2>Under Construction</h2>
                {/* {userChatsUID?.map((chatUID, index) => {
                  return <ChatTab key={index} chatUID={chatUID} />
                })} */}
              </ChatsDrawerDiv>
              <ChatInterfaceDiv>
                <ChatApplet
                  chatMetadata={chatMetadata}
                  ownerInfo={ownerInfo}
                  selectedItemData={selectedItemData}
                />
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
