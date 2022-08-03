import { Reducer } from 'redux'

import { ActionTypes } from './types'

const initialState: State = {}

type State = {}

export const community_reducer: Reducer<State, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
