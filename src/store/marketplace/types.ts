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
/** Actions' types */

export enum MARKETPLACE_ACTIONS {
  SET_CHAT_METADATA = 'MARKETPLACE_ACTIONS.SET_CHAT_METADATA',
}

/** Actions */

type SetChatMetadata = {
  type: typeof MARKETPLACE_ACTIONS.SET_CHAT_METADATA
  chatData: ChatMetadata
}

export type ActionTypes = SetChatMetadata
