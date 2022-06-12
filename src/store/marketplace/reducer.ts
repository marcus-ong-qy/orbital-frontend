import { Reducer } from 'redux'

import { ActionTypes, ChatMetadata, MARKETPLACE_ACTIONS } from './types'

const initialState: State = {
  selectedChatData: {
    id: '',
    createdAt: 0,
    createdBy: '',
    receipient: '',
    itemListing: '',
    recentMessage: null,
  },
}

type State = {
  selectedChatData: ChatMetadata
}

export const marketplace_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA:
      return { ...state, selectedChatData: action.selectedChatData }
    default:
      return state
  }
}
