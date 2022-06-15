import { UseFormRegister, FieldValues } from 'react-hook-form'
import WarningLabels from '../WarningLabels/WarningLabels'
import { InputFieldContainer, StyledInput } from './styles/InputFields.styled'

type Props = {
  title: string
  placeholder: string
  type?: string
  value?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  errorLabel?: string
  isError?: boolean
  register: UseFormRegister<FieldValues>
  pattern?: RegExp
  required?: boolean
}

const defaultProps = {
  required: false,
}

const InputField = (props: Props) => {
  const { title, placeholder, type, errorLabel, isError, register, pattern, required } = props
  return (
    <InputFieldContainer>
      <StyledInput
        type={type ?? 'text'}
        placeholder={placeholder}
        value={props.value}
        {...register(title, { required: required, pattern: pattern })}
        onChange={props.onChange}
      />
      {errorLabel && <WarningLabels label={errorLabel} isError={isError ?? false} />}
    </InputFieldContainer>
  )
}

InputField.defaultProps = defaultProps

export default InputField
