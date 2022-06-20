import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultOptionType } from 'antd/lib/select'

import { theme } from '../../../styles/Theme'
import { PATHS } from '../../../routes/PATHS'
import { ItemListing } from '../../../store/marketplace/types'
import { useAppDispatch } from '../../../app/hooks'
import SearchbarDropdown from './SearchbarDropdown'

import { SearchBarStyled } from './styles/Searchbar.styled'
import { DropdownText } from './styles/SearchbarDropdown.styled'

const dropdownResult = (searchResults: ItemListing[] | null): DefaultOptionType[] | undefined => {
  const { p } = { ...theme.typography.fontSize }

  return searchResults?.map((listing, index) => {
    return {
      value: listing.name,
      label: (
        <div key={index}>
          <DropdownText fontType={p}>{listing.name}</DropdownText>
        </div>
      ),
    }
  })
}

const Searchbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [term, setTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(term)

  // const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<ItemListing[] | null>(null)

  const [dropdownOptions, setdropdownOptions] = useState<DefaultOptionType[] | undefined>(undefined)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const getSearchListings = (term: string) => {
    console.log('a')
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
        // setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 500)
    return () => clearTimeout(timer)
  }, [debouncedTerm])

  const onChangeSubmit = (term: string) => {
    // setLoading(true)
    getSearchListings(term)
    // console.log('onChangeSubmit', term)
  }

  useEffect(() => {
    // console.log(searchResults)
    setdropdownOptions(dropdownResult(searchResults))
  }, [searchResults])

  // useEffect(() => {
  //   console.log('dropdown options:', dropdownOptions)
  // }, [dropdownOptions])

  useEffect(() => {
    term ? onChangeSubmit(term) : setSearchResults(null)
  }, [term])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedTerm(e.target.value)
  }

  const onSearch = () => {
    navigate(`${PATHS.SEARCH}/${debouncedTerm}`)
  }

  return (
    // <AutoComplete
    //   dropdownMatchSelectWidth={252}
    //   options={dropdownOptions}
    //   notFoundContent="No Results"
    //   open={dropdownOpen}
    // >
    <SearchbarDropdown options={['Search Bar Dropdown Under Construction']} show={dropdownOpen}>
      <SearchBarStyled
        // ref={wrapperRef}
        placeholder="Search"
        value={debouncedTerm}
        onChange={onChange}
        onSearch={onSearch}
        // loading={loading}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
      />
    </SearchbarDropdown>

    // </AutoComplete>
  )
}
export default Searchbar
