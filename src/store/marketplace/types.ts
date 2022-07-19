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
  // currentOwner: string
  typeOfTransaction: TransactionType
  price: number
  deliveryInformation: string
  tags: string[]
  imageURL: string[]
  status: ItemStatus
  offeredBy: string
  timeCreated: number
  // durationOfRent: number
}

export type ItemListingPost = {
  name: string
  description: string
  typeOfTransaction: TransactionType
  price: number | undefined
  deliveryInformation: string
  tags: string[] | undefined
  imageURL: string[] | undefined
}

export type TransactionType = 'SELL' | 'RENT'
export type UploadStatus = 'SUCCESS' | 'INITIAL' | 'DELETED'
export type ItemStatus = 'AVAILABLE' | 'OFFERED' | 'SOLD'
export type CreateReservationStatus = 'SUCCESS' | 'INITIAL'
export type MakeTransactionStatus = 'SUCCESS' | 'INITIAL'

/** Actions' types */

export enum MARKETPLACE_ACTIONS {
  SET_SELECTED_CHAT_DATA = 'MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA',
  SET_SELECTED_ITEM_DATA = 'MARKETPLACE_ACTIONS.SET_SELECTED_ITEM_DATA',
  SET_ALL_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_LISTINGS',
  SET_ALL_USER_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS',
  SET_ALL_USER_RESERVATIONS = 'MARKETPLACE_ACTIONS.SET_ALL_USER_RESERVATIONS',
  // SET_CHAT_UID = 'MARKETPLACE_ACTIONS.SET_CHAT_UID',
  SEARCH = 'MARKETPLACE_ACTIONS.SEARCH',
  CREATE_NEW_LISTING = 'MARKETPLACE_ACTIONS.CREATE_NEW_LISTING',
  SET_UPLOAD_STATUS = 'MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS',
  SET_RESERVATION_STATUS = 'MARKETPLACE_ACTIONS.SET_RESERVATION_STATUS',
  SET_TRANSACTION_STATUS = 'MARKETPLACE_ACTIONS.SET_TRANSACTION_STATUS',
}

/** Actions */

type SelectedChatData = {
  type: typeof MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA
  selectedChatData: ChatMetadata
}

type SelectedItemData = {
  type: typeof MARKETPLACE_ACTIONS.SET_SELECTED_ITEM_DATA
  selectedItemData: ItemListing
}

type SetAllListings = {
  type: typeof MARKETPLACE_ACTIONS.SET_ALL_LISTINGS
  allListings: ItemListing[]
}

type SetAllUserListings = {
  type: typeof MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS
  allUserListings: ItemListing[]
}

type SetAllUserReservations = {
  type: typeof MARKETPLACE_ACTIONS.SET_ALL_USER_RESERVATIONS
  allUserReservations: ItemListing[]
}

type Search = {
  type: typeof MARKETPLACE_ACTIONS.SEARCH
  // searchText: string
  searchTags: string[]
  allSearchListings: ItemListing[]
}

// type SetChatUID = {
//   type: typeof MARKETPLACE_ACTIONS.SET_CHAT_UID
//   chatUID: string
// }

type UploadListing = {
  type: typeof MARKETPLACE_ACTIONS.CREATE_NEW_LISTING
  newListing: ItemListingPost
}

type SetUploadStatus = {
  type: typeof MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS
  uploadStatus: UploadStatus
}

type SetCreateReservationStatus = {
  type: typeof MARKETPLACE_ACTIONS.SET_RESERVATION_STATUS
  createReservationStatus: CreateReservationStatus
}

type SetMakeTransactionStatus = {
  type: typeof MARKETPLACE_ACTIONS.SET_TRANSACTION_STATUS
  makeTransactionStatus: MakeTransactionStatus
}

export type ActionTypes =
  | SelectedChatData
  | SelectedItemData
  | SetAllListings
  | SetAllUserListings
  | SetAllUserReservations
  | Search
  // | SetChatUID
  | UploadListing
  | SetUploadStatus
  | SetCreateReservationStatus
  | SetMakeTransactionStatus
