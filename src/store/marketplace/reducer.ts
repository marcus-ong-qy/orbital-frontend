import { Reducer } from 'redux'

import {
  ActionTypes,
  ChatMetadata,
  CreateReservationStatus,
  ItemListing,
  ItemListingPost,
  MakeTransactionStatus,
  MARKETPLACE_ACTIONS,
  UploadStatus,
} from './types'

const defaultChatMetadata: ChatMetadata = {
  id: '',
  createdAt: 0,
  createdBy: '',
  receipient: '',
  itemListing: '',
  recentMessage: null,
}

const defaultListingPost: ItemListingPost = {
  name: '',
  description: '',
  typeOfTransaction: 'SELL',
  price: 0,
  deliveryInformation: '',
  tags: [],
  imageURL: [],
}

const defaultItemListing: ItemListing = {
  _id: '',
  createdBy: '',
  // currentOwner: '',
  status: 'AVAILABLE',
  offeredBy: '',
  name: '',
  description: '',
  typeOfTransaction: 'SELL',
  price: 0,
  deliveryInformation: '',
  tags: [],
  imageURL: [],
  timeCreated: 0,
}

const initialState: State = {
  selectedChatData: defaultChatMetadata,
  selectedItemData: defaultItemListing,

  allListings: [],
  allUserListings: [],
  allUserReservations: [],

  chatUID: '',
  // searchText: '',
  searchTags: [],
  allSearchListings: [],
  newListing: defaultListingPost,
  uploadStatus: 'INITIAL',
  createReservationStatus: 'INITIAL',
  makeTransactionStatus: 'INITIAL',
}

type State = {
  selectedChatData: ChatMetadata
  selectedItemData: ItemListing

  allListings: ItemListing[]
  allUserListings: ItemListing[]
  allUserReservations: ItemListing[]

  chatUID: string
  // searchText: string
  searchTags: string[]
  allSearchListings: ItemListing[]
  newListing: ItemListingPost
  uploadStatus: UploadStatus
  createReservationStatus: CreateReservationStatus
  makeTransactionStatus: MakeTransactionStatus
}

export const marketplace_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA:
      return { ...state, selectedChatData: action.selectedChatData }
    case MARKETPLACE_ACTIONS.SET_SELECTED_ITEM_DATA:
      return { ...state, selectedItemData: action.selectedItemData }
    case MARKETPLACE_ACTIONS.SET_ALL_LISTINGS:
      return { ...state, allListings: action.allListings }
    case MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS:
      return { ...state, allUserListings: action.allUserListings }
    case MARKETPLACE_ACTIONS.SET_ALL_USER_RESERVATIONS:
      return { ...state, allUserReservations: action.allUserReservations }

    case MARKETPLACE_ACTIONS.SEARCH:
      return {
        ...state,
        // searchText: action.searchText,
        searchTags: action.searchTags,
        allSearchListings: action.allSearchListings,
      }
    case MARKETPLACE_ACTIONS.SET_CHAT_UID:
      return { ...state, chatUID: action.chatUID }
    case MARKETPLACE_ACTIONS.CREATE_NEW_LISTING:
      return { ...state, newListing: action.newListing }
    case MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS:
      return { ...state, uploadStatus: action.uploadStatus }
    case MARKETPLACE_ACTIONS.SET_RESERVATION_STATUS:
      return { ...state, createReservationStatus: action.createReservationStatus }
    case MARKETPLACE_ACTIONS.SET_TRANSACTION_STATUS:
      return { ...state, makeTransactionStatus: action.makeTransactionStatus }
    default:
      return state
  }
}
