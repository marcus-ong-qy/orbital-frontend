import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearchbarDropdownOpen, setSearchRedirect } from '../../../store/authentication/actions'
import { ItemListing } from '../../../store/marketplace/types'
import SearchbarDropdown from './SearchbarDropdown'

import { SearchBarStyled } from './styles/Searchbar.styled'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../../../firebase'

const Searchbar = () => {
  const DEBOUNCE_DURATION = 500 // in miliseconds
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { searchbarDropdownOpen, searchRedirect } = useAppSelector((state) => state.auth_reducer)

  const [dropdownTerm, setDropdownTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(dropdownTerm) // adds delay to dropdown results

  // const [loading, setLoading] = useState(false) // TODO in store
  const [searchResults, setSearchResults] = useState<ItemListing[] | null>(null)

  useEffect(() => {
    if (searchbarDropdownOpen && searchRedirect === 'redirect') {
      dispatch(setSearchbarDropdownOpen(false))
      dispatch(setSearchRedirect('initial'))
    }
  }, [searchbarDropdownOpen, searchRedirect])

  const getSearchListings = async (searchText: string) => {
    try {
      const filterAndSearch = httpsCallable(functions, 'filterAndSearch')
      const result = (await filterAndSearch({ search: searchText })) as any
      const success = result.data.success as boolean
      if (!success) {
        // Do some shit to handle failure on the backend
        console.log(result)
        throw new Error("getSearchListing don't success")
      }
      const searchListings: ItemListing[] = result.data.message?.map((msg: any) => msg._doc)
      console.log('i got', searchListings)
      setSearchResults(searchListings)
    } catch (e) {
      console.error('The error is:\n', e as Error)
    }
  }

  // after a delay, transfer debouncedTerm to dropdownTerm
  useEffect(() => {
    const timer = setTimeout(() => setDropdownTerm(debouncedTerm), DEBOUNCE_DURATION)
    return () => clearTimeout(timer)
  }, [debouncedTerm])

  const presentSearchResults = (term: string) => {
    // setLoading(true)
    getSearchListings(term)
  }

  useEffect(() => {
    dropdownTerm ? presentSearchResults(dropdownTerm) : setSearchResults(null)
  }, [dropdownTerm])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedTerm(e.target.value)
  }

  const onSearchClick = () => {
    dispatch(setSearchbarDropdownOpen(false))
    if (debouncedTerm) {
      navigate(`${PATHS.SEARCH}/${debouncedTerm}`)
      dispatch(setSearchRedirect('redirect'))
    }
  }

  return (
    <SearchbarDropdown searchResults={searchResults ?? []}>
      <SearchBarStyled
        placeholder="Search"
        value={debouncedTerm}
        onChange={onInputChange}
        onSearch={onSearchClick}
        // loading={loading}
      />
    </SearchbarDropdown>
  )
}
export default Searchbar
