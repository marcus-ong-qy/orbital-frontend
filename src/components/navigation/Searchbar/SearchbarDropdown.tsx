import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { theme } from '../../../styles/Theme'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PATHS } from '../../../routes/PATHS'
import { setSearchbarDropdownOpen, setSearchRedirect } from '../../../store/authentication/actions'
import { ItemListing } from '../../../store/marketplace/types'

import {
  DropdownOptionDiv,
  SearchbarWrapper,
  StyledSearchbarDropdown,
} from './styles/SearchbarDropdown.styled'

type Props = {
  children: JSX.Element
  searchResults: ItemListing[]
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  required?: boolean
}

// const defaultProps = {
//   required: false,
// }

const SearchbarDropdown = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const wrapperRef = useRef<any>(null)
  const { h2 } = { ...theme.typography.fontSize }
  const { children, searchResults, value, onChange, required } = props

  const manyResults = [...searchResults, ...searchResults, ...searchResults, ...searchResults]

  const { searchbarDropdownOpen } = useAppSelector((state) => state.auth_reducer)

  const DropdownOption = ({ result }: { result: ItemListing }) => {
    const onClick = () => {
      navigate(`${PATHS.SEARCH}/${result.name}`)
      dispatch(setSearchRedirect('redirect'))
    }
    return (
      <DropdownOptionDiv fontType={h2} onClick={onClick}>
        {result.name}
      </DropdownOptionDiv>
    )
  }

  useEffect(() => {
    // Alert if clicked on outside of element
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch(setSearchbarDropdownOpen(false))
      }
    }
    document.addEventListener('mousedown', handleClickOutside) // Bind the event listener
    return () => document.removeEventListener('mousedown', handleClickOutside) // Unbind the event listener on clean up
  }, [wrapperRef])

  return (
    <SearchbarWrapper ref={wrapperRef} onClick={() => dispatch(setSearchbarDropdownOpen(true))}>
      {children}
      {searchbarDropdownOpen && (
        <StyledSearchbarDropdown>
          {searchResults.length ? (
            manyResults.map((result, index) => <DropdownOption key={index} result={result} />)
          ) : (
            <DropdownOptionDiv fontType={h2} disabled>
              No Results
            </DropdownOptionDiv>
          )}
        </StyledSearchbarDropdown>
      )}
    </SearchbarWrapper>
  )
}

export default SearchbarDropdown
