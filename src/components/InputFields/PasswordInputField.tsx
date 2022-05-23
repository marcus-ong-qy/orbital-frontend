import { useState } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormSetValue,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form';
import { theme } from '../../styles/Theme';
import WarningLabels from '../WarningLabels/WarningLabels';
import {
  AlwaysLoggedInSpan,
  InputFieldContainer,
  PasswordLowerSpan,
  PasswordSpan,
  StyledBigA,
  StyledPasswordInput,
} from './styles/InputFields.styled';

type Props = {
  title: string;
  type: 'login' | 'signup';
  placeholder: string;
  errorLabel: string;
  isError: boolean;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  pattern?: RegExp;
  setError?: UseFormSetError<FieldValues>;
  clearErrors?: UseFormClearErrors<FieldValues>;
  required?: boolean;
};

const defaultProps = {
  required: false,
};

const CapsLockIndicator = () => <StyledBigA data-testid="BigA">A</StyledBigA>;

const PasswordInputField = (props: Props) => {
  const {
    title,
    type,
    placeholder,
    errorLabel,
    isError,
    register,
    setValue,
    pattern,
    setError,
    clearErrors,
    required,
  } = props;

  if (pattern && (!setError || !clearErrors)) {
    console.error(
      "PasswordInputField: Both setError and ClearErrors params need to be passed in when 'pattern' param is used!"
    );
  }

  const { labelFont } = { ...theme.typography.fontSize };

  const [isCapsOn, setIsCapsOn] = useState(false);
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    setIsCapsOn(e.getModifierState('CapsLock'));
  };

  // explicitely coded as react-hook-form does not work with antd input by default
  const inputOnChange = (e: any) => {
    setValue(title, e.target.value);
    pattern?.test(e.target.value)
      ? clearErrors!(title)
      : setError!(title, { type: 'pattern' });
  };

  const checkboxOnChange = () => setRememberPassword(!rememberPassword);

  // TODO implement AlwaysLoggedIn checkbox functionality
  return (
    <InputFieldContainer>
      <PasswordSpan>
        <StyledPasswordInput
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          {...register(title, { required: required, pattern: pattern })}
          onChange={inputOnChange}
        />
        {isCapsOn && <CapsLockIndicator />}
      </PasswordSpan>
      <PasswordLowerSpan>
        {type === 'login' && (
          <AlwaysLoggedInSpan fontType={labelFont}>
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={checkboxOnChange}
            />
            Always Logged In
          </AlwaysLoggedInSpan>
        )}
        <WarningLabels label={errorLabel} isError={isError} />
      </PasswordLowerSpan>
    </InputFieldContainer>
  );
};

PasswordInputField.defaultProps = defaultProps;

export default PasswordInputField;
