import { UseFormRegister, FieldValues } from 'react-hook-form'

import {
  DropdownOptionDiv,
  SearchbarWrapper,
  StyledSearchbarDropdown,
} from './styles/SearchbarDropdown.styled'

type Props = {
  children: JSX.Element
  options: string[]
  // register: UseFormRegister<FieldValues>
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  required?: boolean
  show: boolean
}

const defaultProps = {
  required: false,
}

const SearchbarDropdown = (props: Props) => {
  const { children, options, value, onChange, required, show } = props

  return (
    <SearchbarWrapper>
      {children}
      {show && (
        <StyledSearchbarDropdown
        // placeholder={placeholder}
        // value={value}
        // {...register(title, { required: required })}
        // onChange={onChange}
        >
          {options.map((option, index) => {
            return <DropdownOptionDiv key={index}>{option}</DropdownOptionDiv>
          })}
        </StyledSearchbarDropdown>
      )}
    </SearchbarWrapper>
  )
}

export default SearchbarDropdown
