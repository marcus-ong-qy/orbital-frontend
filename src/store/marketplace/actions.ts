import { Dispatch } from 'react'
import { httpsCallable } from 'firebase/functions'
import {
  ActionTypes,
  ChatMetadata,
  ItemListing,
  ItemListingPost,
  MARKETPLACE_ACTIONS,
  UploadStatus,
} from './types'

import { auth, functions } from '../../../src/firebase'
import { setIsLoading } from '../authentication/actions'
import { GetState } from '../types'
import { onAuthStateChanged } from 'firebase/auth'

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

export const setSelectedItemData = (itemData: ItemListing) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: MARKETPLACE_ACTIONS.SET_SELECTED_ITEM_DATA,
    selectedItemData: itemData,
  })
}

/**
 *
 * @param itemId
 * @param setCustomStateHook (optional) pass this to set value to useState hook instead of to store
 */
export const getItemById =
  (itemId: string, setCustomStateHook?: React.Dispatch<React.SetStateAction<ItemListing | null>>) =>
  async (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const { selectedItemData } = getState().marketplace_reducer
    // TODO set data to store, and check if itemId === selectedItemData._id then no need fetch again
    dispatch(setIsLoading(true) as any)
    try {
      if (itemId !== selectedItemData._id) {
        const getItemById = httpsCallable(functions, 'getItemById')
        const result = (await getItemById({ id: itemId })) as any
        const success = result.data.sucess as boolean
        if (!success) {
          console.log(result)
          throw new Error("get item info don't success")
        }
        console.log(result)
        const info: ItemListing = result.data.message._doc
        info._id = itemId // TODO temp patch for backend bug remove when not needed
        setCustomStateHook ? setCustomStateHook(info) : dispatch(setSelectedItemData(info) as any)
      } else {
        console.count('no func call since item id matches')
      }
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
  (searchText: string, searchTags: string[] | null) => async (dispatch: Dispatch<ActionTypes>) => {
    console.log('i searchhie', searchText)
    dispatch(setIsLoading(true) as any)
    try {
      const filterAndSearch = httpsCallable(functions, 'filterAndSearch')
      const result = (await filterAndSearch({ search: searchText, tags: undefined })) as any
      const success = result.data.success as boolean
      if (!success) {
        console.log(result)
        throw new Error("search don't success")
      }
      console.log(result)
      const allSearchListings: ItemListing[] = result.data.message?.map((msg: any) => msg._doc)
      dispatch({
        type: MARKETPLACE_ACTIONS.SEARCH,
        searchTags: searchTags ?? [],
        allSearchListings: allSearchListings,
      })
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false) as any)
    }
  }

/**
 *
 * @param status filter query by item status, 'any' to get all listings by the user (TODO now only accepts 'any')
 */

export const getUserListings =
  (
    status: // 'available' | 'offered' | 'sold' |
    'reservation' | 'any',
  ) =>
  (dispatch: Dispatch<ActionTypes>) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoading(true) as any)
        const userUID = user.uid

        let url = ''
        switch (status) {
          case 'any':
            url = `https://asia-southeast1-orbital2-4105d.cloudfunctions.net/getUserListings?uid=${userUID}`
            break
          default:
            url = `https://asia-southeast1-orbital2-4105d.cloudfunctions.net/getUserListings?uid=${userUID}&status=${status}`
            break
        }

        fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((res) => {
            // TODO consider all cases
            if (status === 'any') {
              const allUserListings: ItemListing[] = res.message
              dispatch({
                type: MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS,
                allUserListings: allUserListings,
              })
            } else if (status === 'reservation') {
              const allUserReservations: ItemListing[] = res.message
              dispatch({
                type: MARKETPLACE_ACTIONS.SET_ALL_USER_RESERVATIONS,
                allUserReservations: allUserReservations,
              })
            }
          })
          .catch((err) => console.error(err))
          .finally(() => dispatch(setIsLoading(false) as any))
      } else {
        // alert('not logged in!')
      }
    })
  }
