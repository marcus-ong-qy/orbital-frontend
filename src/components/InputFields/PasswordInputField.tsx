import { useState } from 'react';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';
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
  pattern: RegExp;
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
    pattern,
    register,
    setValue,
    required,
  } = props;
  const { labelFont } = { ...theme.typography.fontSize };

  const [isCapsOn, setIsCapsOn] = useState(false);
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    setIsCapsOn(e.getModifierState('CapsLock'));
  };

  // required as react-hook-form setValue does not work with antd input by default
  const inputOnChange = (e: any) => setValue(title, e.target.value);

  const checkboxOnChange = () => setRememberPassword(!rememberPassword);

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
