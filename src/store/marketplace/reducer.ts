import { Reducer } from 'redux'

import { ActionTypes, ChatMetadata, ItemListing, MARKETPLACE_ACTIONS } from './types'

const initialState: State = {
  selectedChatData: {
    id: '',
    createdAt: 0,
    createdBy: '',
    receipient: '',
    itemListing: '',
    recentMessage: null,
  },
  allListings: [],
}

type State = {
  selectedChatData: ChatMetadata
  allListings: ItemListing[]
}

export const marketplace_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA:
      return { ...state, selectedChatData: action.selectedChatData }
    case MARKETPLACE_ACTIONS.SET_ALL_LISTINGS:
      return { ...state, allListings: action.allListings }
    default:
      return state
  }
}
