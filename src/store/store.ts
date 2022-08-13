import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'

import { auth_reducer } from './authentication/reducer'
import { marketplace_reducer } from './marketplace/reducer'

export const rootReducer = combineReducers({
  auth_reducer,
  marketplace_reducer,
})

export const store = configureStore({ reducer: rootReducer })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
