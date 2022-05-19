import WarningLabels from '../WarningLabels/WarningLabels';
import { InputFieldContainer, StyledInput } from './styles/InputFields.styled';

type Props = {
  placeholder: string;
  errorLabel?: string;
  isError?: boolean;
  pattern?: RegExp;
  required?: boolean;
};

const defaultProps = {
  required: false,
};

const InputField = (props: Props) => {
  const { placeholder, errorLabel, isError } = props;
  return (
    <InputFieldContainer>
      <StyledInput placeholder={placeholder} />

      {errorLabel && (
        <WarningLabels label={errorLabel} isError={isError ?? false} />
      )}
    </InputFieldContainer>
  );
};

InputField.defaultProps = defaultProps;

export default InputField;
