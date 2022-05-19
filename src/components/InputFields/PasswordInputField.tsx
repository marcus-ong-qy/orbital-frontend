import { useState } from 'react';
import { theme } from '../../styles/Theme';
import WarningLabels from '../WarningLabels/WarningLabels';
import {
  InputFieldContainer,
  PasswordLowerSpan,
  PasswordSpan,
  RememberMeSpan,
  StyledBigA,
  StyledPasswordInput,
} from './styles/InputFields.styled';

type Props = {
  type: 'login' | 'signup';
  placeholder: string;
  errorLabel: string;
  isError: boolean;
  pattern?: RegExp;
};

const defaultProps = {
  required: false,
};

const CapsLockIndicator = () => <StyledBigA>A</StyledBigA>;

const PasswordInputField = (props: Props) => {
  const { type, placeholder, errorLabel, isError } = props;
  const { labelFont } = { ...theme.typography.fontSize };

  const [isCapsOn, setIsCapsOn] = useState(false);
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    setIsCapsOn(e.getModifierState('CapsLock'));
  };

  const onChange = () => setRememberPassword(!rememberPassword);

  return (
    <InputFieldContainer>
      <PasswordSpan>
        <StyledPasswordInput placeholder={placeholder} onKeyDown={onKeyDown} />
        {isCapsOn && <CapsLockIndicator />}
      </PasswordSpan>
      <PasswordLowerSpan>
        {type === 'login' && (
          <RememberMeSpan fontType={labelFont}>
            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={onChange}
            />
            Remember Me
          </RememberMeSpan>
        )}
        <WarningLabels label={errorLabel} isError={isError} />
      </PasswordLowerSpan>
    </InputFieldContainer>
  );
};

PasswordInputField.defaultProps = defaultProps;

export default PasswordInputField;
