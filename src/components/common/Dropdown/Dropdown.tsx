import { UseFormRegister, FieldValues } from 'react-hook-form'

import { StyledDropdown } from './styles/Dropdown.styled'

type Props = {
  title: string
  placeholder: string
  options: string[]
  register: UseFormRegister<FieldValues>
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  required?: boolean
}

const defaultProps = {
  required: false,
}

const Dropdown = (props: Props) => {
  const { title, placeholder, options, register, value, onChange, required } = props

  return (
    <StyledDropdown
      placeholder={placeholder}
      value={value}
      {...register(title, { required: required })}
      onChange={onChange}
    >
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        )
      })}
    </StyledDropdown>
  )
}

export default Dropdown
