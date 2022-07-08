import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { filterAndSearch } from '../../../store/marketplace/actions'

import HorizontalListingBar from '../../../components/common/HorizontalListingBar/HorizontalListingBar'
import LoadingSpin from '../../../components/common/LoadingSpin/LoadingSpin'

import {
  NoListingsLabel,
  SearchDiv,
  SearchListingsDiv,
  // SearchTagsDiv,
  SearchTitle,
  StyledSearchPage,
} from './styles/SearchPage.styled'

const Page = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const params = useParams<{ searchText: string }>()
  const { navTitleFont, h1 } = { ...theme.typography.fontSize }
  const { isLoading } = useAppSelector((state) => state.auth_reducer)

  const {
    // searchTags,
    allSearchListings,
  } = useAppSelector((state) => state.marketplace_reducer)

  useEffect(() => {
    dispatch(filterAndSearch(params.searchText ?? '', null))
  }, [])

  return (
    <StyledSearchPage>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <SearchDiv>
          <SearchTitle fontType={navTitleFont}>
            Search results for '{params.searchText}'
          </SearchTitle>
          {/* <SearchTagsDiv>Tags</SearchTagsDiv> */}

          {allSearchListings.length ? (
            <SearchListingsDiv>
              {allSearchListings.map((listing, index) => {
                return <HorizontalListingBar key={index} itemListing={listing} />
              })}
            </SearchListingsDiv>
          ) : (
            <NoListingsLabel fontType={h1}>No Listings Found</NoListingsLabel>
          )}
        </SearchDiv>
      )}
    </StyledSearchPage>
  )
}

export default Page
