import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../../routes/PATHS'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearchbarDropdownOpen, setSearchRedirect } from '../../../store/authentication/actions'
import { ItemListing } from '../../../store/marketplace/types'
import SearchbarDropdown from './SearchbarDropdown'

import { SearchBarStyled } from './styles/Searchbar.styled'

const Searchbar = () => {
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

  const getSearchListings = (term: string) => {
    console.log('getting search listings')
    fetch(`https://asia-southeast1-orbital2-4105d.cloudfunctions.net/marketplace?search=${term}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.status === 200 && resp.json())
      .then((res) => {
        const searchListings: ItemListing[] = res.message
        setSearchResults(searchListings)
        console.log('i got', searchListings)
        // setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // after a delay, transfer debouncedTerm to dropdownTerm
  useEffect(() => {
    const timer = setTimeout(() => setDropdownTerm(debouncedTerm), 500)
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
