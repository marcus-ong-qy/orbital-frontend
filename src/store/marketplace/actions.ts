import { Dispatch } from 'react'
import { functions } from '../../../src/firebase'
import { httpsCallable } from 'firebase/functions'
import {
  ActionTypes,
  ChatMetadata,
  ItemListing,
  ItemListingPost,
  MARKETPLACE_ACTIONS,
} from './types'

export const setSelectedChatData =
  (selectedChatData: ChatMetadata) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA,
      selectedChatData: selectedChatData,
    })
  }

export const getListings = () => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const getHomepageListings = httpsCallable(functions, 'getHomepageListings')
    const result = (await getHomepageListings()) as any
    const success = result.success as Boolean
    if (!success) {
      // Do some shit to handle failure on the backend
      console.log(result)
      return
    }
    console.log(result)
    const allListings: ItemListing[] = result.message
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_ALL_LISTINGS,
      allListings: allListings,
    })
  } catch (e) {
    console.log('The error is ', e as Error)
  }
}

export const setNewListing = (newListing: ItemListingPost) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: MARKETPLACE_ACTIONS.CREATE_NEW_LISTING,
    newListing: newListing,
  })
}

// TODO searchTags not yet implemented
export const search =
  (searchText: string, searchTags: string[]) => (dispatch: Dispatch<ActionTypes>) => {
    fetch(
      `https://asia-southeast1-orbital2-4105d.cloudfunctions.net/marketplace?search=${searchText}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((resp) => resp.status === 200 && resp.json())
      .then((res) => {
        const searchListings: ItemListing[] = res.message
        dispatch({
          type: MARKETPLACE_ACTIONS.SEARCH,
          // searchText: searchText,
          searchTags: searchTags,
          allSearchListings: searchListings ?? [],
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

export const getUserListings = (userUID: string) => (dispatch: Dispatch<ActionTypes>) => {
  fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/history?user=${userUID}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      const allUserListings: ItemListing[] = res.message
      dispatch({
        type: MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS,
        allUserListings: allUserListings,
      })
    })
    .catch((err) => console.error(err))
}
