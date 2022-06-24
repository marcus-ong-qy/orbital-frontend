import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { theme } from '../../../styles/Theme'
import { auth, getUserFirebaseProfile } from '../../../firebase'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { defaultUserFirebaseProfile } from '../../../store/authentication/reducer'
import { FirebaseProfile } from '../../../store/authentication/types'
import { getUserListings, search } from '../../../store/marketplace/actions'

import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'
import {
  NoListingsLabel,
  SearchDiv,
  SearchListingsDiv,
  SearchTagsDiv,
  SearchTitle,
  StyledSearchPage,
} from './styles/SearchPage.styled'
import { useParams } from 'react-router-dom'

const UserListingsPage = () => {
  const dispatch = useAppDispatch()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }
  const params = useParams<{ searchText: string }>()
  const [userFirebaseProfile, setUserFirebaseProfile] = useState<FirebaseProfile>(
    defaultUserFirebaseProfile,
  )

  const { searchTags, allSearchListings } = useAppSelector((state) => state.marketplace_reducer)

  const manyListingsForTest = [
    ...allSearchListings,
    ...allSearchListings,
    ...allSearchListings,
    ...allSearchListings,
    ...allSearchListings,
    ...allSearchListings,
    ...allSearchListings,
  ]

  useEffect(() => {
    dispatch(search(params.searchText ?? '', []))
  }, [])

  // TODO show loading page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && userFirebaseProfile === defaultUserFirebaseProfile)
        setUserFirebaseProfile(getUserFirebaseProfile(user))
    })
  })

  useEffect(() => {
    dispatch(getUserListings())
  }, [userFirebaseProfile, dispatch])

  return (
    <StyledSearchPage>
      <SearchDiv>
        <SearchTitle fontType={navTitleFont}>Search results for '{params.searchText}'</SearchTitle>
        <SearchTagsDiv>Tags</SearchTagsDiv>

        {allSearchListings.length ? (
          <SearchListingsDiv>
            {manyListingsForTest.map((listing, index) => {
              return (
                <HorizontalListingBar
                  key={index}
                  title={listing.name}
                  type={listing.typeOfTransaction}
                  available={listing.available}
                  price={listing.price}
                  pictureURL={listing.imageURL}
                />
              )
            })}
          </SearchListingsDiv>
        ) : (
          <NoListingsLabel fontType={h1}>No Listings Found</NoListingsLabel>
        )}
      </SearchDiv>
    </StyledSearchPage>
  )
}

export default UserListingsPage
