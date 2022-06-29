import { Reducer } from 'redux'

import {
  ActionTypes,
  ChatMetadata,
  ItemListing,
  ItemListingPost,
  MARKETPLACE_ACTIONS,
  UploadStatus,
} from './types'

const defaultListingPost: ItemListingPost = {
  name: '',
  description: '',
  typeOfTransaction: 'Sell',
  price: 0,
  deliveryInformation: '',
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
  allUserListings: [],
  chatUID: '',
  // searchText: '',
  searchTags: [],
  allSearchListings: [],
  newListing: defaultListingPost,
  uploadStatus: 'INITIAL',
}

type State = {
  selectedChatData: ChatMetadata
  allListings: ItemListing[]
  allUserListings: ItemListing[]
  chatUID: string
  // searchText: string
  searchTags: string[]
  allSearchListings: ItemListing[]
  newListing: ItemListingPost
  uploadStatus: UploadStatus
}

export const marketplace_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA:
      return { ...state, selectedChatData: action.selectedChatData }
    case MARKETPLACE_ACTIONS.SET_ALL_LISTINGS:
      return { ...state, allListings: action.allListings }
    case MARKETPLACE_ACTIONS.SEARCH:
      return {
        ...state,
        // searchText: action.searchText,
        searchTags: action.searchTags,
        allSearchListings: action.allSearchListings,
      }
    case MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS:
      return { ...state, allUserListings: action.allUserListings }
    case MARKETPLACE_ACTIONS.SET_CHAT_UID:
      return { ...state, chatUID: action.chatUID }
    case MARKETPLACE_ACTIONS.CREATE_NEW_LISTING:
      return { ...state, newListing: action.newListing }
    case MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS:
      return { ...state, uploadStatus: action.uploadStatus }
    default:
      return state
  }
}
