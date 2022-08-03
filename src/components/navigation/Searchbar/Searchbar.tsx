import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../../routes/PATHS'
import { sortListingsByAvailableFirst } from '../../../common/sortAndFilterListings'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearchbarDropdownOpen, setSearchRedirect } from '../../../store/authentication/actions'
import { ItemListing } from '../../../store/marketplace/types'

import SearchbarDropdown from './SearchbarDropdown'

import { SearchBarStyled } from './styles/Searchbar.styled'
import { filterAndSearch } from '../../../store/marketplace/actions'

const Searchbar = () => {
  const DEBOUNCE_DURATION = 500 // in miliseconds
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { searchbarDropdownOpen, searchRedirect } = useAppSelector((state) => state.auth_reducer)

  const [dropdownTerm, setDropdownTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(dropdownTerm) // adds delay to dropdown results

  const [searchResults, setSearchResults] = useState<ItemListing[] | null>(null)
  const [sortedSearchResults, setSortedSearchResults] = useState<ItemListing[] | null>(null)

  useEffect(() => {
    if (searchbarDropdownOpen && searchRedirect === 'redirect') {
      dispatch(setSearchbarDropdownOpen(false))
      dispatch(setSearchRedirect('initial'))
    }
  }, [searchbarDropdownOpen, searchRedirect])

  // after a delay, transfer debouncedTerm to dropdownTerm
  useEffect(() => {
    const timer = setTimeout(() => setDropdownTerm(debouncedTerm), DEBOUNCE_DURATION)
    return () => clearTimeout(timer)
  }, [debouncedTerm])

  // send dropdownTerm to api
  useEffect(() => {
    dropdownTerm
      ? dispatch(filterAndSearch(dropdownTerm, [], setSearchResults, true))
      : setSearchResults(null)
  }, [dropdownTerm])

  // sort results in order of availability
  useEffect(() => {
    if (searchResults) {
      const searchResultsSorted = [...searchResults].sort(sortListingsByAvailableFirst)
      setSortedSearchResults(searchResultsSorted)
    }
  }, [searchResults])

  const onSearchClick = () => {
    dispatch(setSearchbarDropdownOpen(false))
    if (debouncedTerm) {
      navigate(`${PATHS.SEARCH}/${debouncedTerm}`)
      dispatch(setSearchRedirect('redirect'))
      window.location.reload()
    }
  }

  return (
    <SearchbarDropdown searchResults={sortedSearchResults ?? []}>
      <SearchBarStyled
        placeholder="Search"
        value={debouncedTerm}
        onChange={(e: any) => setDebouncedTerm(e.target.value)}
        onSearch={onSearchClick}
        // loading={loading}
      />
    </SearchbarDropdown>
  )
}
export default Searchbar
