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
import { setIsLoading } from '../authentication/actions'

export const setSelectedChatData =
  (selectedChatData: ChatMetadata) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA,
      selectedChatData: selectedChatData,
    })
  }

export const getListings = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true) as any)
  fetch('https://asia-southeast1-orbital2-4105d.cloudfunctions.net/home', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res)
      const allListings: ItemListing[] = res.message
      dispatch({
        type: MARKETPLACE_ACTIONS.SET_ALL_LISTINGS,
        allListings: allListings,
      })
      dispatch(setIsLoading(false) as any)
    })
    .catch((err) => {
      console.error(err)
      dispatch(setIsLoading(false) as any)
    })
}

export const getListings_new = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true) as any)
  try {
    const getHomepageListings = httpsCallable(functions, 'getHomepageListings')
    const result = (await getHomepageListings()) as any
    const success = result.data.success as Boolean
    if (!success) {
      // Do some shit to handle failure on the backend
      console.log(result)
      console.log("don't success")
      return
    }
    console.log(result)
    const allListings: ItemListing[] = result.data.message
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_ALL_LISTINGS,
      allListings: allListings,
    })
    dispatch(setIsLoading(false) as any)
  } catch (e) {
    console.log('The error is ', e as Error)
    dispatch(setIsLoading(false) as any)
  }
}

export const setNewListing = (newListing: ItemListingPost) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: MARKETPLACE_ACTIONS.CREATE_NEW_LISTING,
    newListing: newListing,
  })
}

export const postNewListing =
  (newListing: ItemListingPost) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setIsLoading(true) as any)
    fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/item`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newListing),
    })
      .then((resp) => resp.status === 200 && resp.json())
      .then((res) => {
        console.log('the result', res)
        dispatch({
          type: MARKETPLACE_ACTIONS.CREATE_NEW_LISTING,
          newListing: newListing,
        })
        dispatch(setIsLoading(false) as any)
      })
      .catch((err) => {
        console.error(err)
        dispatch(setIsLoading(false) as any)
      })
  }

// TODO searchTags not yet implemented
export const search =
  (searchText: string, searchTags: string[]) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setIsLoading(true) as any)
    try {
      const filterAndSearch = httpsCallable(functions, 'filterAndSearch')
      const result = (await filterAndSearch({
        // tags: [],
        search: searchText,
      })) as any
      const success = result.data.success as Boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        console.log("search don't success")
        return
      }
      console.log(result)
      const searchListings: ItemListing[] = result.data.message.map((msg: any) => msg._doc)
      dispatch({
        type: MARKETPLACE_ACTIONS.SEARCH,
        // searchText: searchText,
        searchTags: searchTags,
        allSearchListings: searchListings ?? [],
      })
      dispatch(setIsLoading(false) as any)
    } catch (e) {
      console.log('The error is ', e as Error)
      dispatch(setIsLoading(false) as any)
    }
  }

export const getUserListings = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true) as any)
  try {
    const getUserListings = httpsCallable(functions, 'getUserListings')
    const result = (await getUserListings()) as any
    const success = result.data.success as Boolean
    if (!success) {
      // Do some shit to handle failure on the backend
      console.log(result)
      console.log("don't success")
      return
    }
    console.log('i present to you user listings', result)
    const allUserListings: ItemListing[] = result.data.message
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS,
      allUserListings: allUserListings,
    })
    dispatch(setIsLoading(false) as any)
  } catch (e) {
    console.log('The error is ', e as Error)
    dispatch(setIsLoading(false) as any)
  }
}
