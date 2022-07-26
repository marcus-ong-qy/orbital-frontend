import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'

import { auth } from '../../../src/firebase'
import { setIsLoading } from '../authentication/actions'
import { Dispatch, GetState } from '../types'
import { BASE_URL, TIMEOUT, TYPE, ENDPOINTS } from '../api'
import {
  ActionTypes,
  ChatMetadata,
  CreateReservationStatus,
  ItemListing,
  ItemListingPost,
  ItemListingPut,
  MakeTransactionStatus,
  MARKETPLACE_ACTIONS,
  UploadStatus,
} from './types'

// export const setChatUID = (chatUID: string) => (dispatch: Dispatch<ActionTypes>) => {
//   dispatch({
//     type: MARKETPLACE_ACTIONS.SET_CHAT_UID,
//     chatUID: chatUID,
//   })
// }

export const setSelectedChatData =
  (selectedChatData: ChatMetadata) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_SELECTED_CHAT_DATA,
      selectedChatData: selectedChatData,
    })
  }

export const getHomepageListings = () => async (dispatch: Dispatch<ActionTypes>) => {
  onAuthStateChanged(auth, async (user) => {
    dispatch(setIsLoading(true) as any)
    try {
      const getItemById = axios.create({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
        headers: { uid: user?.uid ?? '' },
      })
      const response = await getItemById.get(ENDPOINTS.HOME)
      const allListings: ItemListing[] = response.data.message
      dispatch({
        type: MARKETPLACE_ACTIONS.SET_ALL_LISTINGS,
        allListings: allListings,
      })
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      dispatch(setIsLoading(false) as any)
    }
  })
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
        const getItemById = axios.create({
          baseURL: BASE_URL,
          timeout: TIMEOUT,
        })
        const response = await getItemById.get(
          `${ENDPOINTS.ITEM}?type=${TYPE.GET_ITEM_BY_ID}&id=${itemId}`,
        )
        const info: ItemListing = response.data.message
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

export const uploadListing = (newListing: ItemListingPost) => (dispatch: Dispatch<ActionTypes>) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setIsLoading(true) as any)
      const userUID = user.uid
      try {
        const getItemById = axios.create({
          baseURL: BASE_URL,
          timeout: TIMEOUT,
          headers: { uid: userUID },
        })
        const response = await getItemById.post(ENDPOINTS.ITEM, newListing)
        if (response.status === 201) {
          dispatch({
            type: MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS,
            uploadStatus: 'SUCCESS',
          })
          toast.success('Listing Uploaded', { toastId: 'listing-uploaded' })
        }
      } catch (e) {
        console.error('The error is:\n', e as Error)
      } finally {
        dispatch(setIsLoading(false) as any)
      }
    } else {
      toast.error('Error: not logged in!', { toastId: 'please-login' })
    }
  })
}

export const updateItem =
  (updatedListing: ItemListingPut) => (dispatch: Dispatch<ActionTypes>, getState: GetState) => {
    const { selectedItemData } = getState().marketplace_reducer
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setIsLoading(true) as any)
        const userUID = user.uid
        axios
          .put(`${BASE_URL}${ENDPOINTS.ITEM}`, updatedListing, {
            baseURL: BASE_URL,
            timeout: TIMEOUT,
            headers: { uid: userUID },
          })
          .then((response) => {
            if (response.status === 201) {
              const newItemData = { ...selectedItemData, ...updatedListing }
              dispatch(setSelectedItemData(newItemData as ItemListing))
              dispatch(setUploadStatus('SUCCESS'))
              toast.success('Item Updated', { toastId: 'item-updated' })
            }
          })
          .catch((e) => console.error('The error is:\n', e as Error))
          .finally(() => dispatch(setIsLoading(false) as any))
      } else {
        toast.error('Error: not logged in!', { toastId: 'please-login' })
      }
    })
  }

export const deleteItem = (itemId: string) => (dispatch: Dispatch<ActionTypes>) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setIsLoading(true) as any)
      const userUID = user.uid
      axios
        .delete(`${BASE_URL}${ENDPOINTS.ITEM}`, {
          timeout: TIMEOUT,
          headers: { uid: userUID },
          data: { item_id: itemId },
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS,
              uploadStatus: 'DELETED',
            })
            toast.success('Item Deleted', { toastId: 'item-deleted' })
          }
        })
        .catch((e) => console.error('The error is:\n', e as Error))
        .finally(() => dispatch(setIsLoading(false) as any))
    } else {
      toast.error('Error: not logged in!', { toastId: 'please-login' })
    }
  })
}

export const setUploadStatus =
  (uploadStatus: UploadStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_UPLOAD_STATUS,
      uploadStatus: uploadStatus,
    })
  }

const setAllSearchListings =
  (allSearchListings: ItemListing[], searchTags: string[] | null) =>
  async (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SEARCH,
      searchTags: searchTags ?? [],
      allSearchListings: allSearchListings,
    })
  }

// TODO searchTags not yet implemented
export const filterAndSearch =
  (
    searchText: string,
    searchTags: string[] | null, // TODO not yet implemented
    setCustomStateHook?: React.Dispatch<React.SetStateAction<ItemListing[] | null>>,
    noLoadingSpin?: boolean,
  ) =>
  async (dispatch: Dispatch<ActionTypes>) => {
    !noLoadingSpin && dispatch(setIsLoading(true) as any)
    try {
      const getItemById = axios.create({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
      })
      const response = await getItemById.get(
        `/item?type=${TYPE.FILTER_AND_SEARCH}&search=${searchText}`,
      )
      const allSearchListings: ItemListing[] = response.data.message
      setCustomStateHook
        ? setCustomStateHook(allSearchListings)
        : dispatch(setAllSearchListings(allSearchListings, []) as any)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    } finally {
      !noLoadingSpin && dispatch(setIsLoading(false) as any)
    }
  }

/**
 *
 * @param status filter query by item status, 'any' to get all listings by the user (TODO now only accepts 'any')
 */

export const getUserListings =
  (
    status: // 'AVAILABLE' | 'OFFERED' | 'SOLD' |
    'reservation' | 'any',
  ) =>
  (dispatch: Dispatch<ActionTypes>) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setIsLoading(true) as any)
        const userUID = user.uid

        try {
          const getUserListings = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
            // headers: { uid: userUID },
          })

          let url = ''
          switch (status) {
            case 'any':
              url = `${ENDPOINTS.ITEM}?type=getListingsBasedOnStatus&uid=${userUID}`
              break
            default:
              url = `${ENDPOINTS.ITEM}?type=getListingsBasedOnStatus&uid=${userUID}&status=${status}`
              break
          }
          const response = await getUserListings.get(url)
          const info: ItemListing[] = response.data.message

          // TODO consider all cases
          if (status === 'any') {
            const allUserListings: ItemListing[] = info
            dispatch({
              type: MARKETPLACE_ACTIONS.SET_ALL_USER_LISTINGS,
              allUserListings: allUserListings,
            })
          } else if (status === 'reservation') {
            const allUserReservations: ItemListing[] = info
            dispatch({
              type: MARKETPLACE_ACTIONS.SET_ALL_USER_RESERVATIONS,
              allUserReservations: allUserReservations,
            })
          }
        } catch (e) {
          console.error('The error is:\n', e as Error)
        } finally {
          dispatch(setIsLoading(false) as any)
        }
      } else {
        toast.error('Error: not logged in!', { toastId: 'please-login' })
      }
    })
  }

export const setCreateReservationStatus =
  (createReservationStatus: CreateReservationStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_RESERVATION_STATUS,
      createReservationStatus: createReservationStatus,
    })
  }

export const setMakeTransactionStatus =
  (makeTransactionStatus: MakeTransactionStatus) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: MARKETPLACE_ACTIONS.SET_TRANSACTION_STATUS,
      makeTransactionStatus: makeTransactionStatus,
    })
  }

export const createReservation = (itemId: string) => (dispatch: Dispatch<ActionTypes>) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setIsLoading(true) as any)
      const userUID = user.uid
      axios
        .post(
          `${BASE_URL}${ENDPOINTS.RESERVATION}`,
          { item_id: itemId },
          {
            timeout: TIMEOUT,
            headers: { uid: userUID },
          },
        )
        .then((response) => {
          if (response.status === 200) {
            dispatch(setCreateReservationStatus('SUCCESS'))
            dispatch(setSelectedItemData(response.data.message))
            toast.success('Reservation Created!', { toastId: 'reserved' })
          }
          console.log(response)
        })
        .catch((e) => {
          console.log({ uid: userUID })
          console.error('The error is:\n', e as Error)
          toast.error('Create Reservation failed', { toastId: 'reserve-fail' })
        })
        .finally(() => dispatch(setIsLoading(false) as any))
    } else {
      toast.error('Error: not logged in!', { toastId: 'please-login' })
    }
  })
}

export const makeTransaction = (itemId: string) => (dispatch: Dispatch<ActionTypes>) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setIsLoading(true) as any)
      const userUID = user.uid

      axios
        .post(
          `${BASE_URL}${ENDPOINTS.TRANSACTION}`,
          { item_id: itemId },
          {
            timeout: TIMEOUT,
            headers: { uid: userUID },
          },
        )
        .then((response) => {
          if (response.status === 201) {
            dispatch(setMakeTransactionStatus('SUCCESS'))
            dispatch(setSelectedItemData(response.data.message))
            toast.success('Transaction Successful!', { toastId: 'transacted' })
          }
          console.log(response)
        })
        .catch((e) => {
          console.log({ uid: userUID })
          console.error('The error is:\n', e as Error)
          toast.error('Make Transaction failed', { toastId: 'transact-fail' })
        })
        .finally(() => dispatch(setIsLoading(false) as any))
    } else {
      toast.error('Error: not logged in!', { toastId: 'please-login' })
    }
  })
}
