import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, onValue, ref } from 'firebase/database'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { auth, database } from '../../../firebase'

import { getAnotherUserInfo } from '../../../store/authentication/actions'
import { UserData } from '../../../store/authentication/types'
import { getItemById } from '../../../store/marketplace/actions'
import { ChatMetadata } from '../../../store/marketplace/types'

import ChatApplet from '../../../components/marketplace/ChatApplet/ChatApplet'
import ChatTab from '../../../components/marketplace/ChatDrawer/ChatTab'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'
import PleaseLoginNotice from '../../../components/common/PleaseLoginNotice/PleaseLoginNotice'

import {
  ChatInterfaceDiv,
  ChatsDrawerDiv,
  ChatsDrawerHeader,
  StyledChatPage,
} from './styles/ChatPage.styled'

// Chat Page and Chat Components created with reference to https://www.youtube.com/watch?v=zQyrwxMPm88
const ChatPage = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { chatUID } = useParams<{ chatUID: string }>()
  const { h1 } = { ...theme.typography.fontSize }
  const { isLoading, isLoggedIn, userFirebaseProfile } = useAppSelector(
    (state) => state.auth_reducer,
  )
  const { selectedItemData } = useAppSelector((state) => state.marketplace_reducer)

  // const [userChatsUID, setUserChatsUID] = useState<string[]>()
  const [chatMetadata, setChatMetadata] = useState<ChatMetadata | null>(null)
  const [ownerInfo, setOwnerInfo] = useState<UserData | null>(null)

  const user = auth.currentUser
  const isCreator = chatMetadata?.createdBy === user?.uid
  const receipientUID = isCreator ? chatMetadata?.receipient : chatMetadata?.createdBy

  useEffect(() => {
    const userChatRef = ref(database, 'chats/' + chatUID)

    get(userChatRef).then((snapshot) => {
      const chatData: ChatMetadata = snapshot.val()
      setChatMetadata(chatData)
      console.log('chat metadata', chatData)
    })
  }, [chatUID])

  useEffect(() => {
    chatMetadata?.itemListing && dispatch(getItemById(chatMetadata.itemListing))
    receipientUID && dispatch(getAnotherUserInfo(receipientUID, setOwnerInfo))
  }, [chatMetadata])

  // useEffect(() => {
  //   const userUID = userFirebaseProfile.uid
  //   const userChatsUIDRef = ref(database, 'users/' + userUID + '/chats')

  //   onValue(userChatsUIDRef, (snapshot) => {
  //     const data: Record<string, string> = snapshot.val()
  //     const newUserChatsUID = Object.values(data)
  //     setUserChatsUID(newUserChatsUID)
  //   })
  // }, [userFirebaseProfile])

  return (
    <StyledChatPage>
      {isLoggedIn ? (
        <>
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <>
              {/* <ChatsDrawerDiv>
                <ChatsDrawerHeader fontType={h1}>Chats</ChatsDrawerHeader>
                {userChatsUID?.map((chatUID, index) => {
                  return <ChatTab key={index} chatUID={chatUID} />
                })}
              </ChatsDrawerDiv> */}
              <ChatInterfaceDiv>
                <ChatApplet
                  ownerInfo={ownerInfo}
                  selectedItemData={selectedItemData}
                  chatUID={chatUID ?? ''}
                />
              </ChatInterfaceDiv>
            </>
          )}
        </>
      ) : (
        <PleaseLoginNotice />
      )}
    </StyledChatPage>
  )
}

export default ChatPage
