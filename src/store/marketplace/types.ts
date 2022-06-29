/** Types */
export type ChatMetadata = {
  id: string
  createdAt: number
  createdBy: string
  receipient: string
  itemListing: string
  recentMessage: Message | null
}

export type Message = {
  id: string
  messageText: string
  sentAt: number
  sentBy: string
}

export type ItemListing = {
  _id: string
  name: string
  description: string
  createdBy: string
  currentOwner: string
  typeOfTransaction: 'Sell' | 'Rent'
  price: number
  deliveryInformation: string
  tags: string[]
  imageURL: string
  status: ItemStatus
  // durationOfRent: number
}

export type ItemListingPost = {
  name: string
  description: string
  typeOfTransaction: 'Sell' | 'Rent'
  price: number
  deliveryInformation: string
  tags: string[] | undefined
  imageURL: string | undefined
}

export type UploadStatus = 'SUCCESS' | 'INITIAL'
export type ItemStatus = 'AVAILABLE' | 'RESERVED' | 'ON_LOAN' | 'SOLD'

/** Actions' types */

export enum MARKETPLACE_ACTIONS {
  SET_SELECTED_CHAT_DATA = 'MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA',
  SET_ALL_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_LISTINGS',
  SET_ALL_USER_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS',
  SET_CHAT_UID = 'MARKETPLACE_ACTIONS.SET_CHAT_UID',
  SEARCH = 'MARKETPLACE_ACTIONS.SEARCH',
  CREATE_NEW_LISTING = 'MARKETPLACE_ACTIONS.CREATE_NEW_LISTING',
  SET_UPLOAD_STATUS = 'MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS',
}

/** Actions */

type SelectedChatData = {
  type: typeof MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA
  selectedChatData: ChatMetadata
}
type SetAllListings = {
  type: typeof MARKETPLACE_ACTIONS.SET_ALL_LISTINGS
  allListings: ItemListing[]
}

type Search = {
  type: typeof MARKETPLACE_ACTIONS.SEARCH
  // searchText: string
  searchTags: string[]
  allSearchListings: ItemListing[]
}

type SetAllUserListings = {
  type: typeof MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS
  allUserListings: ItemListing[]
}

type SetChatUID = {
  type: typeof MARKETPLACE_ACTIONS.SET_CHAT_UID
  chatUID: string
}

type UploadListing = {
  type: typeof MARKETPLACE_ACTIONS.CREATE_NEW_LISTING
  newListing: ItemListingPost
}

type SetUploadStatus = {
  type: typeof MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS
  uploadStatus: UploadStatus
}

export type ActionTypes =
  | SelectedChatData
  | SetAllListings
  | Search
  | SetAllUserListings
  | SetChatUID
  | UploadListing
  | SetUploadStatus
