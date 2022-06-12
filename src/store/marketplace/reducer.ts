import { Reducer } from 'redux'

import {
  ActionTypes,
  ChatMetadata,
  ItemListing,
  ItemListingPost,
  MARKETPLACE_ACTIONS,
} from './types'

const defaultListingPost: ItemListingPost = {
  createdBy: '',
  name: '',
  price: 0,
  description: '',
  typeOfTransaction: 'Sell',
  deliveryInformation: '',
  // durationOfRent: 0,
  tags: [],
  imageURL: '',
}

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
  newListing: defaultListingPost,
}

type State = {
  selectedChatData: ChatMetadata
  allListings: ItemListing[]
  newListing: ItemListingPost
}

export const marketplace_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA:
      return { ...state, selectedChatData: action.selectedChatData }
    case MARKETPLACE_ACTIONS.SET_ALL_LISTINGS:
      return { ...state, allListings: action.allListings }
    case MARKETPLACE_ACTIONS.CREATE_NEW_LISTING:
      return { ...state, newListing: action.newListing }
    default:
      return state
  }
}
