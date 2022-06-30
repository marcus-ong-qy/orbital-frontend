import { Dispatch } from 'react'
import { functions } from '../../../src/firebase'
import { httpsCallable } from 'firebase/functions'
import {
  ActionTypes,
  ChatMetadata,
  ItemListing,
  ItemListingPost,
  MARKETPLACE_ACTIONS,
  UploadStatus,
} from './types'
import { setIsLoading } from '../authentication/actions'

export const setChatUID = (chatUID: string) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: MARKETPLACE_ACTIONS.SET_CHAT_UID,
    chatUID: chatUID,
  })
}

export const setSelectedChatData =
  (selectedChatData: ChatMetadata) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA,
      selectedChatData: selectedChatData,
    })
  }

export const getHomepageListings = () => async (dispatch: Dispatch<ActionTypes>) => {
  console.log('getting listings')
  dispatch(setIsLoading(true) as any)
  try {
    const getHomepageListings = httpsCallable(functions, 'getHomepageListings')
    const result = (await getHomepageListings()) as any
    const success = result.data.success as boolean
    if (!success) {
      // Do some shit to handle failure on the backend
      console.log(result)
      throw new Error("get listings don't success")
    }
    console.log('getListings:\n', result)
    const allListings: ItemListing[] = result.data.message
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_ALL_LISTINGS,
      allListings: allListings,
    })
  } catch (e) {
    console.error('The error is:\n', e as Error)
  } finally {
    dispatch(setIsLoading(false) as any)
  }
}

export const setNewListing = (newListing: ItemListingPost) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: MARKETPLACE_ACTIONS.CREATE_NEW_LISTING,
    newListing: newListing,
  })
}

export const uploadListing =
  (newListing: ItemListingPost) => async (dispatch: Dispatch<ActionTypes>) => {
    console.log('posty post')
    dispatch(setIsLoading(true) as any)
    try {
      const uploadListing = httpsCallable(functions, 'uploadListing')
      const result = (await uploadListing(newListing)) as any
      const success = result.data.success as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("post new listing don't success")
      }
      console.log(result)
      dispatch({
        type: MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS,
        uploadStatus: 'SUCCESS',
      })
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false) as any)
    }
  }

export const updateItem =
  (updatedListing: ItemListingPost, itemId: string) => async (dispatch: Dispatch<ActionTypes>) => {
    console.log('posty post')
    dispatch(setIsLoading(true) as any)
    try {
      const updateItem = httpsCallable(functions, 'updateItem')
      const result = (await updateItem({ ...updatedListing, item_id: itemId })) as any
      const success = result.data.success as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("update listing don't success")
      }
      console.log(result)
      dispatch({
        type: MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS,
        uploadStatus: 'SUCCESS',
      })
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false) as any)
    }
  }

export const setUploadStatus =
  (uploadStatus: UploadStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS,
      uploadStatus: uploadStatus,
    })
  }

// TODO searchTags not yet implemented

export const filterAndSearch =
  (searchText: string, searchTags: string[]) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setIsLoading(true) as any)
    try {
      const filterAndSearch = httpsCallable(functions, 'filterAndSearch')
      const result = (await filterAndSearch({ search: searchText, tags: searchTags })) as any
      const success = result.data.success as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("search don't success")
      }
      console.log('i present to you search', result)
      const allSearchListings: ItemListing[] = result.data.message
      dispatch({
        type: MARKETPLACE_ACTIONS.SEARCH,
        searchTags: searchTags,
        allSearchListings: allSearchListings,
      })
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false) as any)
    }
  }

export const getUserListings = () => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setIsLoading(true) as any)
  try {
    const getUserListings = httpsCallable(functions, 'getUserListings')
    const result = (await getUserListings()) as any
    const success = result.data.success as boolean
    if (!success) {
      // Do some shit to handle failure on the backend
      console.log(result)
      throw new Error("get user listings don't success")
    }
    console.log('get user listings:\n', result)
    const allUserListings: ItemListing[] = result.data.message
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS,
      allUserListings: allUserListings,
    })
  } catch (e) {
    console.error('The error is:\n', e as Error)
  } finally {
    dispatch(setIsLoading(false) as any)
  }
}
