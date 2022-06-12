import { Dispatch } from 'react'
import { ActionTypes, ChatMetadata, MARKETPLACE_ACTIONS } from './types'

export const setSelectedChatData =
  (selectedChatData: ChatMetadata) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA,
      selectedChatData: selectedChatData,
    })
  }
