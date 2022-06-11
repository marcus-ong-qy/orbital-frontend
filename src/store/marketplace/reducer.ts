import { Reducer } from 'redux'

import { ActionTypes, ChatMetadata } from './types'

const initialState: State = {
  chatData: {
    id: 'string',
    createdAt: Date.now(),
    createdBy: 'Kh45xlC3RPQm0501LB7NihUSEwu1',
    receipient: 'wu1wu1wu1wu1wu1wu1wu1wu1wu1',
    itemListing: '',
    recentMessage: null,
  },
}

type State = {
  chatData: ChatMetadata
}

export const marketplace_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
