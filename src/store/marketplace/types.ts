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
  createdBy: string
  name: string
  price: number
  description: string
  typeOfTransaction: 'Rent' | 'Sell'
  deliveryInformation: string
  available: boolean
  currentOwner: string
  durationOfRent: number
  tags: string[]
  imageURL: string
  timeCreated: number
}

export type ItemListingPost = {
  createdBy: string
  name: string
  price: number
  description: string
  typeOfTransaction: 'Rent' | 'Sell'
  deliveryInformation: string
  // durationOfRent: number
  tags: string[]
  imageURL: string
}

/** Actions' types */

export enum MARKETPLACE_ACTIONS {
  SET_SELECTED_CHAT_DATA = 'MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA',
  SET_ALL_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_LISTINGS',
  SET_ALL_USER_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS',
  CREATE_NEW_LISTING = 'MARKETPLACE_ACTIONS.CREATE_NEW_LISTING',
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

type SetAllUserListings = {
  type: typeof MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS
  allUserListings: ItemListing[]
}

type UploadListing = {
  type: typeof MARKETPLACE_ACTIONS.CREATE_NEW_LISTING
  newListing: ItemListingPost
}

export type ActionTypes = SelectedChatData | SetAllListings | SetAllUserListings | UploadListing
