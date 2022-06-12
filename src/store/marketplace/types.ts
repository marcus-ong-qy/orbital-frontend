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

/** Actions' types */

export enum MARKETPLACE_ACTIONS {
  SET_SELECTED_CHAT_DATA = 'MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA',
  SET_ALL_LISTINGS = 'MARKETPLACE_ACTIONS.SET_ALL_LISTINGS',
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

export type ActionTypes = SelectedChatData | SetAllListings
