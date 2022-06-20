import { Dispatch } from 'react'
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

export const getListings = () => (dispatch: Dispatch<ActionTypes>) => {
  fetch('https://asia-southeast1-orbital2-4105d.cloudfunctions.net/home', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      const allListings: ItemListing[] = res.message
      dispatch({
        type: MARKETPLACE_ACTIONS.SET_ALL_LISTINGS,
        allListings: allListings,
      })
    })
    .catch((err) => console.error(err))
}

export const setNewListing = (newListing: ItemListingPost) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: MARKETPLACE_ACTIONS.CREATE_NEW_LISTING,
    newListing: newListing,
  })
}

// export const setSearch =
//   (
//     // searchText: string,
//     searchTags: string[], allSearchListings: ItemListing[]) =>
//   (dispatch: Dispatch<ActionTypes>) => {
//     dispatch({
//       type: MARKETPLACE_ACTIONS.SEARCH,
//       // searchText: searchText,
//       searchTags: searchTags,
//       allSearchListings: allSearchListings,
//     })
//   }

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
