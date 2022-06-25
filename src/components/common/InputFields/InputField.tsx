import { useEffect, useRef } from 'react'
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form'
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
  // setValue?: UseFormSetValue<FieldValues>
  pattern?: RegExp
  required?: boolean
  // ref?: any
}

const defaultProps = {
  required: false,
}

// /**
//  *
//  * @param props.setValue (optional) if facing autocomplete issues, pass in this prop
//  */

const InputField = (props: Props) => {
  const { title, placeholder, type, errorLabel, isError, register, pattern, required } = props
  // const inputRef = useRef<any>(null)

  // // hacky way to force read value of autocomplete
  // // TODO remove and improve
  // useEffect(() => {
  //   console.log()
  //   inputRef.current && inputRef.current.click()
  // }, [inputRef])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (inputRef.current && props.setValue) {
  //       console.log('set', inputRef.current.value)
  //       props.setValue(title, inputRef.current.value)
  //       clearInterval(interval)
  //     }
  //   }, 100)
  // })

  return (
    <InputFieldContainer>
      <StyledInput
        type={type ?? 'text'}
        placeholder={placeholder}
        value={props.value}
        {...register(title, { required: required, pattern: pattern })}
        onChange={props.onChange}
        // ref={inputRef}
      />
      {errorLabel && <WarningLabels label={errorLabel} isError={isError ?? false} />}
    </InputFieldContainer>
  )
}

InputField.defaultProps = defaultProps

export default InputField
